import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import UserDTO from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import SpecialistRegisterDTO from "../specialist/dto/register-specialist.dto";
import { AuthService } from "./auth.service";
import { UseAuthorized } from "./decorators/use-auth.decorator";
import UseSession from "./decorators/use-session.decorator";
import UserRegisterDTO from "./dto/register-user.dto";
import ResetPasswordDTO from "./dto/reset-password.dto";
import { UserSession } from "./dto/session-user.dto";
import { GoogleOAuthGuard } from "./guards/passport/google-login.guard";
import { LoginGuard } from "./guards/passport/login.guard";
import { ResetPasswordTokenService } from "./token/reset-password.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly resetPasswordService: ResetPasswordTokenService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized()
	@Get("me")
	async me(@UseSession() session: UserSession) {
		const user = await this.userService.findById(session.id);
		if (!user) throw new BadRequestException("User not found");
		const dto = UserDTO.fromEntity(user);

		return {
			...dto,
			isAdmin: session.isAdmin,
			isSpecialist: session.isSpecialist,
		};
	}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: UserRegisterDTO) {
		await this.authService.register(dto);
		return { message: "Send verification link to the email" };
	}

	@UsePipes(new ValidationPipe())
	@Post("register/specialist")
	async registerSpecialist(@Body() dto: SpecialistRegisterDTO) {
		await this.authService.registerSpecialist(dto);
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
	googleAuthRedirect(@Res() res: Response) {
		res.redirect(this.configService.get("CLIENT_DOMAIN", "/"));
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
		await this.authService.verifyEmailWithToken(token);
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
