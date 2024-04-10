import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Query,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import { ChatService } from "./chat.service";

@Controller("chats")
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get("recent-dialogs")
	@UseAuthorized()
	async getRecentDialogs(@UseSession() user: UserSession) {
		return await this.chatService.findRecentDialogs(user.id);
	}

	@Get("dialogs/:anotherUserId")
	@UseAuthorized()
	async getDialog(
		@Param("anotherUserId") anotherUserId: string,
		@UseSession() user: UserSession,
	) {
		const room = await this.chatService.findDialogDetailsById(
			user.id,
			+anotherUserId,
		);
		if (!room) throw new BadRequestException("Dialog not found");

		return room;
	}

	@Get("dialog-messages/:roomId")
	@UseAuthorized()
	async getDialogMessages(
		@Param("roomId") roomId: string,
		@Query("before") before: string,
		@UseSession() user: UserSession,
	) {
		// Check if the user is a member of the room
		const isMember = this.chatService.isMemberOfRoom(roomId, user.id);
		if (!isMember) throw new BadRequestException("Dialog not found");

		return this.chatService.findDialogMessages(roomId, before);
	}
}
