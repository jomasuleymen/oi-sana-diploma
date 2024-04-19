import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Query,
} from "@nestjs/common";
import { isNumberString, isString } from "class-validator";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import { ChatService } from "./chat.service";

@Controller("chats")
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get("dialogs")
	@UseAuthorized()
	async getDialogByQuery(
		@Query("user") userId: string,
		@Query("room") roomId: string,
		@UseSession() user: UserSession,
	) {
		if (userId && isNumberString(userId)) {
			return await this.chatService.findDialog(user.id, +userId);
		} else if (roomId && isString(roomId)) {
			return await this.chatService.findDialogByRoomId(user.id, roomId);
		} else {
			throw new BadRequestException("User ID or Room ID is required");
		}
	}

	@Get("recent-dialogs")
	@UseAuthorized()
	async getRecentDialogs(@UseSession() user: UserSession) {
		return await this.chatService.findRecentDialogs(user.id);
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

		return await this.chatService.findDialogMessages(roomId, before);
	}

	@Get("message-permission/:userId")
	@UseAuthorized()
	async checkMessagePermission(
		@Param("userId") userId: string,
		@UseSession() user: UserSession,
	): Promise<boolean> {
		if (user.isAdmin) return true;
		const roomId = this.chatService.getRoomIdByUsers(user.id, +userId);
		return await this.chatService.checkMessagePermission(roomId, user.id);
	}
}
