import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import UserRegisterDTO from "src/auth/dto/user-register.dto";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { isEmail } from "class-validator";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) {}

	async createUser(dto: UserRegisterDTO) {
		const userByUsername = await this.usersRepository.exists({
			where: {
				username: dto.username,
			},
		});
		if (userByUsername)
			throw new BadRequestException("username is already taken");

		const userByEmail = await this.usersRepository.exists({
			where: {
				email: dto.email,
			},
		});

		if (userByEmail) throw new BadRequestException("email is already taken");

		const decryptedPassword = bcrypt.hashSync(dto.password, 10);

		const data: Partial<UserEntity> = {
			username: dto.username,
			email: dto.email,
			password: decryptedPassword,
		};

		const user = await this.usersRepository.insert(data);

		return user;
	}

	async findAll(
		filter: FindManyOptions<UserEntity> = {},
	): Promise<UserEntity[]> {
		return await this.usersRepository.find({
			order: {
				role: "DESC",
			},
			...filter,
		});
	}

	async findById(id: string) {
		return await this.usersRepository.findOneBy({ id });
	}

	async findByUsername(username: string) {
		return await this.usersRepository.findOneBy({ username });
	}

	async findByEmail(email: string) {
		return await this.usersRepository.findOneBy({ email });
	}

	async findByEmailOrUsername(username: string) {
		if (isEmail(username)) {
			return await this.findByEmail(username);
		}

		return await this.findByUsername(username);
	}

	async deleleUser(filter: FindOptionsWhere<UserEntity> | UserEntity["id"][]) {
		return await this.usersRepository.delete(filter);
	}
}
