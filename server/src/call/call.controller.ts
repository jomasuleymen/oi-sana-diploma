import { Controller, Get, Param } from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import { CallService } from "./call.service";

@Controller("call")
export class CallController {
	constructor(private readonly callService: CallService) {}

	@Get(":room")
	@UseAuthorized()
	async joinRoom(
		@UseSession() user: UserSession,
		@Param("room") roomId: string,
	) {
		return await this.callService.joinRoom(roomId, user.id);
	}
}
