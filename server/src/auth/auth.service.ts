import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compareHash, hashPlainText } from "src/lib/hash.util";
import { SpecialistService } from "src/specialist/specialist.service";
import UserDTO from "src/user/dto/user.dto";
import { User } from "src/user/entities/user.entity";
import { ROLE } from "src/user/user-enums";
import { UserService } from "src/user/user.service";
import { Equal, Repository } from "typeorm";
import SpecialistRegisterDTO from "../specialist/dto/register-specialist.dto";
import UserLoginDTO from "./dto/login-user.dto";
import UserOAuthDTO from "./dto/register-user-oauth.dto";
import UserRegisterDTO from "./dto/register-user.dto";
import {
	EmailNotVerifiedException,
	LoginFailedException,
	SpecialistNotVerifiedException,
} from "./exceptions/auth.exceptions";
import { EmailVerificationService } from "./token/email-verification.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly specialistService: SpecialistService,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private readonly emailVerificationService: EmailVerificationService,
	) {}

	async register(dto: UserRegisterDTO) {
		const user = await this.userService.createUser(dto);
		this.emailVerificationService.sendEmailVerificationToken(user.email);
		return UserDTO.fromEntity(user);
	}

	async registerSpecialist(dto: SpecialistRegisterDTO) {
		const user = await this.userService.createUser(dto, ROLE.SPECIAL);
		await this.specialistService.create(user, dto);
		this.emailVerificationService.sendEmailVerificationToken(user.email);
		return UserDTO.fromEntity(user);
	}

	async validateOAuthUser(dto: UserOAuthDTO): Promise<UserDTO> {
		let user = await this.getUserByEmailOrUsername(dto.email);
		if (!user) user = await this.userService.createOAuth(dto);

		if (!user.emailVerified) {
			await this.userService.updateById(user.id, { emailVerified: new Date() });
		}

		return UserDTO.fromEntity(user);
	}

	async validateLocalUser(dto: UserLoginDTO): Promise<UserDTO> {
		const user = await this.getUserByEmailOrUsername(dto.email);
		if (!user || !user.password) throw new LoginFailedException();

		const isPasswordCorrect = compareHash(dto.password, user.password);
		if (!isPasswordCorrect) throw new LoginFailedException();

		if (!user.emailVerified) throw new EmailNotVerifiedException();

		if (user.role === ROLE.SPECIAL) {
			const specialist = await this.specialistService.findOne(user.id);
			if (!specialist || !specialist.isVerified) {
				throw new SpecialistNotVerifiedException();
			}
		}

		return UserDTO.fromEntity(user);
	}

	private async getUserByEmailOrUsername(email: string) {
		return await this.usersRepository.findOne({
			where: [{ email: Equal(email) }, { username: Equal(email) }],
			select: [
				"id",
				"username",
				"email",
				"password",
				"emailVerified",
				"firstname",
				"lastname",
				"role",
				"createdAt",
				"profileImage",
			],
		});
	}

	async verifyEmailWithToken(token: string) {
		const email = await this.emailVerificationService.checkAndGetEmail(token);
		const existingUser = await this.userService.findByEmail(email);
		if (!existingUser) {
			throw new BadRequestException("Email does not exist!");
		}

		await this.userService.updateById(existingUser.id, {
			emailVerified: new Date(),
		});
	}

	async resetPassword(email: string, password: string) {
		const existingUser = await this.userService.findByEmail(email);
		if (!existingUser) {
			throw new BadRequestException("Email does not exist!");
		}

		await this.userService.updateById(existingUser.id, {
			password: hashPlainText(password),
		});
	}
}
