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
import { Meditation } from "./entities/meditation.entity";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { ROLE } from "src/user/user-enums";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";

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
		@SortingParams<Meditation>([]) sort?: Sorting[],
		@FilteringParams<Meditation>(["category.id", "category.name"])
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

	@Delete("categories/:id")
	async deleteCategory(@Param("id") id: string) {
		return await this.meditationService.deleteCategory(+id);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.meditationService.findOne(+id);
	}

	@Get("categories/:id")
	async findByCategoryId(@Param("id") id: string) {
		return await this.meditationService.findByCategoryId(+id);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.meditationService.deleteManyById(dto.id as any);

		return { message: "Meditations deleted successfully" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete(":id")
	async deleteOne(@Param("id") id: number) {
		await this.meditationService.deleteById(id);

		return { message: "Meditation deleted successfully" };
	}
}
