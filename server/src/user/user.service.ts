import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmail } from "class-validator";
import UserRegisterDTO from "src/auth/dto/register-user.dto";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { hashPlainText } from "src/lib/hash.util";
import { PaginatedResource, getOrder, getWhere } from "src/lib/typeorm.util";
import { Equal, FindManyOptions, Repository } from "typeorm";
import UserDTO from "./dto/user.dto";
import { UserEntity } from "./entities/user.entity";

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
		return await this.usersRepository.findOneBy({ id: Equal(id) });
	}

	async findByUsername(username: string) {
		return await this.usersRepository.findOneBy({ username: Equal(username) });
	}

	async findByEmail(email: string) {
		return await this.usersRepository.findOneBy({ email: Equal(email) });
	}

	async findBy(
		{ limit, offset, size }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	): Promise<PaginatedResource<UserDTO>> {
		const where = getWhere(filter);
		const order = getOrder(sort);

		const [users, count] = await this.usersRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
		});

		const usersDto: Array<UserDTO> = [];

		for (const user of users) {
			usersDto.push(UserDTO.fromEntity(user));
		}

		return {
			totalItems: count,
			items: usersDto,
			pageCount: Math.ceil(count / size),
		};
	}

	async findByEmailOrUsername(email: string) {
		if (isEmail(email)) {
			return await this.findByEmail(email);
		}

		return await this.findByUsername(email);
	}

	async updateById(userId: UserEntity["id"], data: Partial<UserEntity>) {
		return await this.usersRepository.update({ id: Equal(userId) }, data);
	}

	async updateManyById(ids: UserEntity["id"][], data: Partial<UserEntity>) {
		return await this.usersRepository.update(ids, data);
	}

	async deleteById(userId: UserEntity["id"]) {
		return await this.usersRepository.delete({ id: Equal(userId) });
	}
	async deleteManyById(ids: UserEntity["id"][]) {
		return await this.usersRepository.delete(ids);
	}
}
