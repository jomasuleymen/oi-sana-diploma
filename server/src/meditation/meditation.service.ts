import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";
import { Equal, Repository } from "typeorm";
import { CreateMeditationCategoryDto } from "./dto/create-meditation-category.dto";
import { CreateMeditationDto } from "./dto/create-meditation.dto";
import { MeditationCategory } from "./entities/meditation-catergory.entity";
import { Meditation } from "./entities/meditation.entity";

@Injectable()
export class MeditationService {
	constructor(
		@InjectRepository(Meditation)
		private meditationRepository: Repository<Meditation>,
		@InjectRepository(MeditationCategory)
		private categoryRepository: Repository<MeditationCategory>,
	) {}

	async create(createMeditationDto: CreateMeditationDto) {
		const category = await this.categoryRepository.findOneBy({
			id: createMeditationDto.categoryId,
		});

		if (!category) {
			throw new Error("Category not found");
		}

		for (const audio of createMeditationDto.audio) {
			await this.meditationRepository.save({
				category,
				audio: audio,
			});
		}
	}

	async findAllCategory() {
		return await this.categoryRepository.find({ loadRelationIds: true });
	}

	async createCategory(dto: CreateMeditationCategoryDto) {
		return await this.categoryRepository.save(dto);
	}

	async deleteCategory(id: number) {
		return await this.categoryRepository.delete({ id: Equal(id) });
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<Meditation>(filter);
		const order = getOrder(sort);

		const [articles, count] = await this.meditationRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: ["category"],
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

	async findByCategoryId(id: number) {
		return await this.meditationRepository.findBy({
			category: { id },
		});
	}

	async deleteById(id: Meditation["id"]) {
		return await this.meditationRepository.delete({ id: Equal(id) });
	}
	async deleteManyById(ids: Meditation["id"][]) {
		return await this.meditationRepository.delete(ids);
	}
}
