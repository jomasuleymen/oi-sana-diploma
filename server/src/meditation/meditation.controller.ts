/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
	Filtering,
	FilteringParams,
} from "src/decorators/filtering-params.decorator";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";
import {
	Sorting,
	SortingParams,
} from "src/decorators/sorting-params.decorator";
import { CreateMeditationCategoryDto } from "./dto/create-meditation-category.dto";
import { CreateMeditationDto } from "./dto/create-meditation.dto";
import { MeditationService } from "./meditation.service";
import { MeditationEntity } from "./entities/meditation.entity";

@Controller("meditations")
export class MeditationController {
	constructor(private readonly meditationService: MeditationService) {}

	@Post()
	async create(@Body() createMeditationDto: CreateMeditationDto) {
		return await this.meditationService.create(createMeditationDto);
	}

	@Get()
	async findAll(
		@PaginationParams() pagination: Pagination,
		@SortingParams<MeditationEntity>(["title"]) sort?: Sorting[],
		@FilteringParams<MeditationEntity>(["title", "category", "video"])
		filter?: Filtering[],
	) {
		return await this.meditationService.findAll(pagination, sort, filter);
	}

	@Get("categories/")
	async findAllCategory() {
		return await this.meditationService.findAllCategory();
	}

	@Post("categories/")
	async createCategory(
		@Body() createMeditationCategoryDto: CreateMeditationCategoryDto,
	) {
		return await this.meditationService.createCategory(
			createMeditationCategoryDto,
		);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.meditationService.findOne(+id);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.meditationService.remove(+id);
	}
}
