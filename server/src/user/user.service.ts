import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserRegisterDTO from "src/auth/dto/register-user.dto";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { isEmail } from "class-validator";
import { hashPlainText } from "src/lib/hash-utils";

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

		const data: Partial<UserEntity> = {
			username: dto.username,
			email: dto.email,
			password: hashPlainText(dto.password),
		};

		const user = await this.usersRepository.save(data);
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

	async findByEmailOrUsername(email: string) {
		if (isEmail(email)) {
			return await this.findByEmail(email);
		}

		return await this.findByUsername(email);
	}

	async update(
		filter: FindOptionsWhere<UserEntity> | UserEntity["id"],
		data: Partial<UserEntity>,
	) {
		return await this.usersRepository.update(filter, data);
	}

	async deleleUser(filter: FindOptionsWhere<UserEntity> | UserEntity["id"][]) {
		return await this.usersRepository.delete(filter);
	}
}
