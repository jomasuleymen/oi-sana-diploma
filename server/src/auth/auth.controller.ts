import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import UserDTO from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import UserPayload from "./decorators/userPayload.decorator";
import UserRegisterDTO from "./dto/user-register.dto";
import { LoginGuard } from "./guards/login.guard";
import { UseAuthorized } from "./decorators/useAuthRoles.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: UserRegisterDTO) {
		await this.authService.register(dto);

		return {
			message: "Пользователь успешно зарегистрирован",
			success: true,
		};
	}

	// @UsePipes(new ValidationPipe({ transform: true }))
	// @UseAuthorized(USER_ROLE.ADMIN)
	// @Post("register-seller")
	// async registerSeller(@Body() dto: SellerRegisterDTO) {
	// 	await this.authService.register(dto);

	// 	return {
	// 		message: "Продавец успешно зарегистрирован",
	// 		success: true,
	// 	};
	// }

	@UseGuards(LoginGuard)
	@HttpCode(200)
	@Post("login")
	async login(@UserPayload() user: UserDTO) {
		if (!user) {
			return {
				message: "Ошибка сервера",
				success: false,
			};
		}

		return {
			message: "Успешный вход",
			success: true,
		};
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized()
	@Get("me")
	async me(@UserPayload() user: UserDTO) {
		return user;
	}

	@Get("logout")
	logout(@Req() request: Request): any {
		request.session.destroy(err => {
			if (err) {
				console.warn(err);
			}
		});

		return { message: "Успешный выход", success: true };
	}
}
