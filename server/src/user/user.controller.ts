import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Put,
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
import { DeleteManyDTO } from "./dto/user-delete.dto";
import { User } from "./entities/user.entity";
import { ROLE } from "./user-enums";
import { UserService } from "./user.service";
import { UserUpdateDTO } from "./dto/user-update.dto";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized(ROLE.ADMIN)
	@Get()
	async find(
		@PaginationParams() pagination: Pagination,
		@SortingParams<User>(["username", "email"]) sort?: Sorting[],
		@FilteringParams<User>(["username", "email", "role", "firstname", "lastname"])
		filter?: Filtering[],
	) {
		return await this.userService.findBy(pagination, sort, filter);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.userService.findById(+id);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(
		@Body() dto: DeleteManyDTO,
		@UseSession() user: UserSession,
	) {
		if (!dto || !dto.id) return new BadRequestException("User id is required");

		if (!user.isAdmin) {
			return new BadRequestException("Users can be deleted by admin");
		}

		if (!Array.isArray(dto.id)) dto.id = [dto.id];
		await this.userService.deleteManyById(dto.id);

		return { message: "Пользователь успешно удален" };
	}

	@UseAuthorized()
	@Delete(":id")
	async deleteOne(
		@Param("id") userId: string,
		@UseSession() session: UserSession,
	) {
		const user = await this.userService.findById(+userId);
		if (!user) return new BadRequestException("User not found");

		if (!session.isAdmin && user.id !== session.id) {
			return new BadRequestException("User can be deleted on by himself");
		}

		await this.userService.deleteById(+userId);

		return { message: "Пользователь успешно удален" };
	}

	@UseAuthorized()
	@Put()
	async updateOne(
		@Body() dto: UserUpdateDTO,
		@UseSession() session: UserSession,
	) {
		return this.userService.updateById(session.id, dto);
	}
}
