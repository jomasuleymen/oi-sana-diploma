import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";
import { Repository } from "typeorm";
import { CreateMeditationCategoryDto } from "./dto/create-meditation-category.dto";
import { CreateMeditationDto } from "./dto/create-meditation.dto";
import { MeditationCategoryEntity } from "./entities/meditation-catergory.entity";
import { MeditationEntity } from "./entities/meditation.entity";

@Injectable()
export class MeditationService {
	constructor(
		@InjectRepository(MeditationEntity)
		private meditationRepository: Repository<MeditationEntity>,
		@InjectRepository(MeditationCategoryEntity)
		private categoryRepository: Repository<MeditationCategoryEntity>,
	) {}

	async create(createMeditationDto: CreateMeditationDto) {
		const category = await this.categoryRepository.findOneBy({
			id: createMeditationDto.categoryId,
		});

		if (!category) {
			throw new Error("Category not found");
		}

		await this.meditationRepository.save({
			...createMeditationDto,
			category,
		});
	}

	async findAllCategory() {
		return await this.categoryRepository.find();
	}

	async createCategory(dto: CreateMeditationCategoryDto) {
		await this.categoryRepository.save(dto);
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<MeditationEntity>(filter);
		const order = getOrder(sort);

		const [articles, count] = await this.meditationRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			select: {
				id: true,
				title: true,
				video: true,
				category: { id: true, name: true, image: true },
			},
		});

		return {
			totalItems: count,
			items: articles,
			pageCount: Math.ceil(count / size),
		};
	}

	async findOne(id: number) {
		return await this.meditationRepository.findOneBy({
			id,
		});
	}

	async remove(id: number) {
		await this.meditationRepository.delete(id);
	}
}
