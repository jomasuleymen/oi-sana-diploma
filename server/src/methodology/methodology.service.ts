import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { Equal, Repository } from "typeorm";
import { CreateMethodologyDto } from "./dto/create-methodology.dto";
import { UpdateMethodologyDto } from "./dto/update-methodology.dto";
import { Methodology } from "./entities/methodology.entity";
import { getOrder, getWhere } from "src/lib/typeorm.util";

@Injectable()
export class MethodologyService {
	constructor(
		@InjectRepository(Methodology)
		private methodologyRepo: Repository<Methodology>,
	) {}

	async create(createMethodologyDto: CreateMethodologyDto) {
		return await this.methodologyRepo.save(createMethodologyDto);
	}

	async findAllData(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<Methodology>(filter);
		const order = getOrder(sort);

		const [books, count] = await this.methodologyRepo.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
		});

		return {
			totalItems: count,
			items: books,
			pageCount: Math.ceil(count / size),
		};
	}

	async findAll() {
		return await this.methodologyRepo.find();
	}

	async findOne(id: number) {
		return await this.methodologyRepo.findOneBy({ id });
	}

	async update(id: number, updateMethodologyDto: UpdateMethodologyDto) {
		return await this.methodologyRepo.update(id, updateMethodologyDto);
	}

	async deleteById(id: Methodology["id"]) {
		return await this.methodologyRepo.delete({ id: Equal(id) });
	}
	async deleteManyById(ids: Methodology["id"][]) {
		return await this.methodologyRepo.delete(ids);
	}
}
