import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	Query,
	Req,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import UserDTO from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { UseAuthorized } from "./decorators/use-auth.decorator";
import UseSession from "./decorators/use-session.decorator";
import UserRegisterDTO from "./dto/register-user.dto";
import ResetPasswordDTO from "./dto/reset-password.dto";
import { UserSession } from "./dto/session-user.dto";
import { GoogleOAuthGuard } from "./guards/passport/google-login.guard";
import { LoginGuard } from "./guards/passport/login.guard";
import { EmailVerificationService } from "./token/email-verification.service";
import { ResetPasswordTokenService } from "./token/reset-password.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly emailVerificationService: EmailVerificationService,
		private readonly resetPasswordService: ResetPasswordTokenService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized()
	@Get("me")
	async me(@UseSession() session: UserSession) {
		const user = await this.userService.findById(session.id);
		if (!user) throw new BadRequestException("User not found");
		const dto = UserDTO.fromEntity(user);

		return { ...dto, isAdmin: session.isAdmin };
	}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: UserRegisterDTO) {
		const user = await this.authService.register(dto);
		this.emailVerificationService.sendEmailVerificationToken(user.email);
		return { message: "Send verification link to the email" };
	}

	@UseGuards(LoginGuard)
	@Post("login")
	async login() {
		return { message: "Success login" };
	}

	@Get("google")
	@UseGuards(GoogleOAuthGuard)
	async googleAuth() {}

	@Get("callback/google")
	@UseGuards(GoogleOAuthGuard)
	googleAuthRedirect(@UseSession() user: UserSession) {
		return user;
	}

	@Get("logout")
	logout(@Req() request: Request): any {
		request.session.destroy(err => {
			if (err) {
				console.warn(err);
			}
		});

		return { message: "Logged out" };
	}

	@Get("email-verification")
	async verifyEmail(@Query("token") token: string) {
		const email = await this.emailVerificationService.checkAndGetEmail(token);
		await this.authService.verifyEmail(email);

		return { message: "Email verified" };
	}

	@Get("forgot-password")
	async forgotPassword(@Query("email") email: string) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new BadRequestException("User not found with this email");

		await this.resetPasswordService.sendResetPasswordToken(user.email);
		return { message: "Send link to the email" };
	}

	@Post("reset-password")
	async resetPassword(@Body() dto: ResetPasswordDTO) {
		const email = await this.resetPasswordService.checkAndGetEmail(dto.token);
		if (!email) throw new BadRequestException("User not found with this email");

		await this.authService.resetPassword(email, dto.password);

		return { message: "Password has been changed" };
	}
}
