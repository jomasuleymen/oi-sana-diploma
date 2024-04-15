import { Body, Controller, Get, Param, Patch, Put } from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
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
import { ROLE } from "src/user/user-roles";
import { UpdateSpecialistStatusDTO } from "./dto/update-specialist-status.dto";
import { UpdateSpecialistDTO } from "./dto/update-specialist.dto";
import { Specialist } from "./entities/specialist.entity";
import { SpecialistService } from "./specialist.service";

@Controller("specialists")
export class SpecialistController {
	constructor(private readonly specialistService: SpecialistService) {}

	@Get()
	async findAll(
		@PaginationParams() pagination: Pagination,
		@SortingParams<Specialist>(["user.username", "user.email"])
		sort?: Sorting[],
		@FilteringParams<Specialist>(["user.username"])
		filter?: Filtering[],
	) {
		return await this.specialistService.findAll(pagination, sort, filter);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.specialistService.findOne(+id);
	}

	@Patch(":id")
	@UseAuthorized(ROLE.ADMIN)
	async updateStatus(
		@Param("id") id: string,
		@Body() updateSpecialistDto: UpdateSpecialistStatusDTO,
	) {
		return await this.specialistService.updateStatus(
			+id,
			updateSpecialistDto.isVerified,
		);
	}

	@Put()
	@UseAuthorized(ROLE.SPECIAL)
	async updateOne(
		@Body() dto: UpdateSpecialistDTO,
		@UseSession() session: UserSession,
	) {
		return this.specialistService.updateById(session.id, dto);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Get("statistics/count")
	async countStatistics() {
		return await this.specialistService.getCountStatistics();
	}
}
