import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	UseInterceptors,
} from "@nestjs/common";
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
import { SessionService } from "src/session/session.service";
import { UserDeleteDTO } from "./dto/user-delete.dto";
import { USER_ROLE } from "./user-roles";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized(USER_ROLE.ADMIN)
	@Get()
	async find(
		@PaginationParams() pagination: Pagination,
		@SortingParams<UserEntity>(["username", "email"]) sort?: Sorting[],
		@FilteringParams<UserEntity>(["username", "email", "role"])
		filter?: Filtering[],
	) {
		return await this.userService.findBy(pagination, sort, filter);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.userService.findById(id);
	}

	@UseAuthorized(USER_ROLE.ADMIN)
	@Delete("many")
	async deleteMany(
		@Body() dto: UserDeleteDTO,
		@UseSession() user: UserSession,
	) {
		if (!dto || !dto.id) return new BadRequestException("User id is required");

		if (!user.isAdmin) {
			return new BadRequestException("Users can be deleted by admin");
		}

		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.userService.deleteManyById(dto.id);
		this.sessionService.deleteUserSessions(dto.id);

		return { message: "Пользователь успешно удален" };
	}

	@UseAuthorized()
	@Delete(":id")
	async deleteOne(
		@Param("id") userId: string,
		@UseSession() user: UserSession,
	) {
		const userEntity = await this.userService.findById(userId);
		if (!userEntity) return new BadRequestException("User not found");

		if (!user.isAdmin && userEntity.id !== user.id) {
			return new BadRequestException("User can be deleted on by himself");
		}

		await this.userService.deleteById(userId);
		this.sessionService.deleteUserSessions(userId);

		return { message: "Пользователь успешно удален" };
	}
}
