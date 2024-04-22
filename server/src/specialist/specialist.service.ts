import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Equal, Repository } from "typeorm";
import SpecialistRegisterDTO from "./dto/register-specialist.dto";
import { UpdateSpecialistDTO } from "./dto/update-specialist.dto";
import { Specialist } from "./entities/specialist.entity";

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
		specialist.phone = dto.phone;

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
		const promises = [];

		if (data.profileImage) {
			const updateUser = this.userService.updateById(userId, {
				profileImage: data.profileImage,
			});

			promises.push(updateUser);
		}

		if (data.about) {
			const updateSpec = this.specRepository.update(
				{ userId },
				{ about: data.about },
			);

			promises.push(updateSpec);
		}

		await Promise.all(promises);
	}

	async getCountStatistics() {
		const thisMonthSql = this.specRepository
			.createQueryBuilder("spec")
			.select("COUNT(*)")
			.leftJoin("spec.user", "user")
			.where(
				"EXTRACT(MONTH FROM user.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE)",
			)
			.groupBy("user.id")
			.getCount();

		const lastMonthSql = this.specRepository
			.createQueryBuilder("spec")
			.select("COUNT(*)")
			.leftJoin("spec.user", "user")
			.where(
				"EXTRACT(MONTH FROM user.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')",
			)
			.groupBy("user.id")
			.getCount();

		const [thisMonthCount, lastMonthCount] = await Promise.all([
			thisMonthSql,
			lastMonthSql,
		]);

		return {
			thisMonth: thisMonthCount || 0,
			lastMonth: lastMonthCount || 0,
		};
	}
}
