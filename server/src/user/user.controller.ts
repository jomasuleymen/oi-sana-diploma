import {
	BadRequestException,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	Param,
	UseInterceptors,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { SessionService } from "src/session/session.service";
import { USER_ROLE } from "./user-roles";
import { UserService } from "./user.service";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";

@Controller("users")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized(USER_ROLE.ADMIN)
	@Get()
	async findAll() {
		try {
			return this.userService.findAll();
		} catch (err) {
			throw new InternalServerErrorException({
				message: "Ошибка в сервере",
			});
		}
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized(USER_ROLE.ADMIN)
	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			return this.userService.findById(id);
		} catch (err) {
			throw new InternalServerErrorException({
				message: "Ошибка в сервере",
			});
		}
	}

	@UseAuthorized()
	@Delete(":id")
	async delete(@Param("id") userId: string, @UseSession() user: UserSession) {
		const userEntity = await this.userService.findById(userId);
		if (!userEntity)
			return new BadRequestException({ message: "User not found" });

		if (!user.isAdmin && userEntity.id !== user.id) {
			return new BadRequestException({
				message: "User can be deleted on by himself",
			});
		}

		await this.userService.deleleUser({ id: userId });
		this.sessionService.deleteUserSessions(userId);

		return { message: "Пользователь успешно удален" };
	}
}
