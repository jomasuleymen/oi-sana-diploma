import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";
import { ROLE } from "src/user/user-roles";
import { AffirmationsService } from "./affirmations.service";
import { CreateAffirmationDto } from "./dto/create-affirmation.dto";

@Controller("affirmations")
export class AffirmationsController {
	constructor(private readonly affirmationsService: AffirmationsService) {}

	@Post()
	async create(@Body() createAffirmationDto: CreateAffirmationDto) {
		return await this.affirmationsService.create(createAffirmationDto);
	}

	@Get("all")
	async findAll() {
		return await this.affirmationsService.findAll();
	}

	@Get()
	async findAllBy(@PaginationParams() pagination: Pagination) {
		return await this.affirmationsService.findBy(pagination);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.affirmationsService.deleteManyById(dto.id as any);

		return { message: "Affirmations deleted" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.affirmationsService.deleteById(+id);

		return { message: "Affirmation deleted" };
	}
}
