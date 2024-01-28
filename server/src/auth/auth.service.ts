import { BadRequestException, Injectable } from "@nestjs/common";
import { compareHash, hashPlainText } from "src/lib/hash-utils";
import UserDTO from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import UserLoginDTO from "./dto/login-user.dto";
import UserRegisterDTO from "./dto/register-user.dto";
import {
	EmailNotVerifiedException,
	LoginFailedException,
} from "./exceptions/auth.exceptions";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(dto: UserRegisterDTO) {
		return await this.userService.createUser(dto);
	}

	async validateUser(dto: UserLoginDTO): Promise<UserDTO> {
		const user = await this.userService.findByEmailOrUsername(dto.email);
		if (!user) throw new LoginFailedException();

		const isPasswordCorrect = compareHash(dto.password, user.password);
		if (!isPasswordCorrect) throw new LoginFailedException();

		if (!user.emailVerified) throw new EmailNotVerifiedException();

		return UserDTO.fromEntity(user);
	}

	async verifyEmail(email: string) {
		const existingUser = await this.userService.findByEmail(email);
		if (!existingUser) {
			throw new BadRequestException("Email does not exist!");
		}

		await this.userService.update(existingUser.id, {
			emailVerified: new Date(),
		});
	}

	async resetPassword(email: string, password: string) {
		const existingUser = await this.userService.findByEmail(email);
		if (!existingUser) {
			throw new BadRequestException("Email does not exist!");
		}

		await this.userService.update(existingUser.id, {
			password: hashPlainText(password),
		});
	}
}
