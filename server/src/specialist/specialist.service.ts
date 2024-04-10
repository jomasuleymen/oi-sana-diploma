import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";
import { User } from "src/user/entities/user.entity";
import { Equal, Repository } from "typeorm";
import SpecialistRegisterDTO from "./dto/register-specialist.dto";
import { Specialist } from "./entities/specialist.entity";
import { UserService } from "src/user/user.service";
import { UpdateSpecialistDTO } from "./dto/update-specialist.dto";

@Injectable()
export class SpecialistService {
	constructor(
		@InjectRepository(Specialist)
		private readonly specRepository: Repository<Specialist>,
		private readonly userService: UserService,
	) {}

	async create(user: User, dto: SpecialistRegisterDTO) {
		const specialist = new Specialist();
		specialist.user = user;
		specialist.resume = dto.resume;

		return await this.specRepository.save(specialist);
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<Specialist>(filter);
		const order = getOrder(sort);

		const [articles, count] = await this.specRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: ["user"],
		});

		return {
			totalItems: count,
			items: articles,
			pageCount: Math.ceil(count / size),
		};
	}

	async findOneAndGetUser(id: number) {
		return await this.specRepository.findOne({
			where: { userId: id },
			relations: ["user"],
			select: ["user"],
		});
	}

	async findOne(id: number) {
		return await this.specRepository.findOne({
			where: { userId: id },
			relations: ["user"],
		});
	}

	async updateStatus(id: number, isVerified: boolean) {
		await this.specRepository.update({ userId: Equal(id) }, { isVerified });
	}

	async updateById(userId: Specialist["userId"], data: UpdateSpecialistDTO) {
		const updateUser = await this.userService.updateById(userId, {
			profileImage: data.profileImage,
		});

		const updateSpec = await this.specRepository.update(
			{ userId },
			{ about: data.about || undefined },
		);

		await Promise.all([updateUser, updateSpec]);
	}
}
