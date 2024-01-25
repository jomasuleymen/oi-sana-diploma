import {
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	Param,
	UseInterceptors,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/useAuthRoles.decorator";
import { SessionService } from "src/session/session.service";
import { USER_ROLE } from "./user-roles";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@UseAuthorized(USER_ROLE.ADMIN)
	@Get("sellers")
	async sellers() {
		try {
			return this.userService.findAll();
		} catch (err) {
			throw new InternalServerErrorException({
				message: "Ошибка в сервере",
			});
		}
	}

	@UseAuthorized(USER_ROLE.ADMIN)
	@Delete("/:id")
	async deleteSeller(@Param("id") userId: string) {
		try {
			const user = await this.userService.deleleUser({ id: userId });
			if (!user.affected) throw new Error("Пользователь не найден");

			this.sessionService.deleteUserSessions(userId);

			return {
				success: true,
				message: "Пользователь успешно удален",
			};
		} catch (e) {
			return {
				success: false,
				message: "Ошибка при удалении пользователя",
			};
		}
	}
}
