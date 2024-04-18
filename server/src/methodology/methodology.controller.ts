import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { ROLE } from "src/user/user-enums";
import { CreateMethodologyDto } from "./dto/create-methodology.dto";
import { UpdateMethodologyDto } from "./dto/update-methodology.dto";
import { MethodologyService } from "./methodology.service";
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
import { Methodology } from "./entities/methodology.entity";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";

@Controller("methodologies")
export class MethodologyController {
	constructor(private readonly methodologyService: MethodologyService) {}

	@Post()
	@UseAuthorized(ROLE.ADMIN)
	async create(@Body() createMethodologyDto: CreateMethodologyDto) {
		return this.methodologyService.create(createMethodologyDto);
	}

	@Get()
	async findAll(
		@PaginationParams() pagination: Pagination,
		@SortingParams<Methodology>(["title"]) sort?: Sorting[],
		@FilteringParams<Methodology>(["title"]) filter?: Filtering[],
	) {
		return this.methodologyService.findAllData(pagination, sort, filter);
	}

	@Get("all")
	async find() {
		return this.methodologyService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.methodologyService.findOne(+id);
	}

	@Patch(":id")
	@UseAuthorized(ROLE.ADMIN)
	async update(
		@Param("id") id: string,
		@Body() updateMethodologyDto: UpdateMethodologyDto,
	) {
		return this.methodologyService.update(+id, updateMethodologyDto);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.methodologyService.deleteManyById(dto.id as any);

		return { message: "Методология успешно удалены" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete(":id")
	async deleteOne(@Param("id") id: number) {
		await this.methodologyService.deleteById(id);

		return { message: "Методология успешно удален" };
	}
}
