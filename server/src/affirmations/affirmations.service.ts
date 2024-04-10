import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { PaginatedResource } from "src/lib/typeorm.util";
import { Equal, Repository } from "typeorm";
import { CreateAffirmationDto } from "./dto/create-affirmation.dto";
import { Affirmation } from "./entities/affirmation.entity";

@Injectable()
export class AffirmationsService {
	constructor(
		@InjectRepository(Affirmation)
		private affirmationRepo: Repository<Affirmation>,
	) {}

	async create(createAffirmationDto: CreateAffirmationDto) {
		const affirmation = this.affirmationRepo.create(createAffirmationDto);
		return await this.affirmationRepo.save(affirmation);
	}

	async findAll() {
		return await this.affirmationRepo.find();
	}

	async findBy({
		size,
		limit,
		offset,
	}: Pagination): Promise<PaginatedResource<Affirmation>> {
		const [items, count] = await this.affirmationRepo.findAndCount({
			take: limit,
			skip: offset,
		});

		return {
			totalItems: count,
			items,
			pageCount: Math.ceil(count / size),
		};
	}

	async deleteById(id: Affirmation["id"]) {
		return await this.affirmationRepo.delete({ id: Equal(id) });
	}
	async deleteManyById(ids: Affirmation["id"][]) {
		return await this.affirmationRepo.delete(ids);
	}
}
