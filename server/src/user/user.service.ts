import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmail } from "class-validator";
import UserOAuthDTO from "src/auth/dto/register-user-oauth.dto";
import UserRegisterDTO from "src/auth/dto/register-user.dto";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { hashPlainText } from "src/lib/hash.util";
import { PaginatedResource, getOrder, getWhere } from "src/lib/typeorm.util";
import { Equal, FindManyOptions, Repository } from "typeorm";
import UserDTO from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { ROLE } from "./user-enums";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async createUser(dto: UserRegisterDTO, role: ROLE = ROLE.USER) {
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
		if (!dto.password) throw new BadRequestException("password is required");

		const data: Partial<User> = {
			firstname: dto.firstname,
			lastname: dto.lastname,
			username: dto.username,
			email: dto.email,
			password: hashPlainText(dto.password),
			role,
		};

		const user = await this.usersRepository.save(data);
		return user;
	}

	async createOAuth(dto: UserOAuthDTO) {
		let baseUsername = (
			dto.firstname || dto.email.split("@")[0].slice(0, 6)
		).toLowerCase();
		let username = baseUsername;
		let counter = 0;

		while (await this.usersRepository.exists({ where: { username } })) {
			username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;

			if (counter++ > 100) {
				throw new InternalServerErrorException("username generation failed");
			}
		}

		const data: Partial<User> = {
			firstname: dto.firstname,
			lastname: dto.lastname,
			email: dto.email,
			username,
			role: ROLE.USER,
			emailVerified: new Date(),
			profileImage: dto.profileImage,
		};

		return await this.usersRepository.save(data);
	}

	async findAll(filter: FindManyOptions<User> = {}): Promise<User[]> {
		return await this.usersRepository.find({
			order: {
				role: "DESC",
			},
			...filter,
		});
	}

	async findById(id: number) {
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

	async updateById(userId: User["id"], data: Partial<User>) {
		return await this.usersRepository.update({ id: Equal(userId) }, data);
	}

	async updateManyById(ids: User["id"][], data: Partial<User>) {
		return await this.usersRepository.update(ids, data);
	}

	async deleteById(userId: User["id"]) {
		return await this.usersRepository.delete({ id: Equal(userId) });
	}
	async deleteManyById(ids: User["id"][]) {
		return await this.usersRepository.delete(ids);
	}
}
