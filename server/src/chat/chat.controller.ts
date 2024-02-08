import { RedisService } from "@liaoliaots/nestjs-redis";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import { ChatService } from "./chat.service";
import { MessageDTO } from "./dto/message.dto";

@Controller("chats")
export class ChatController {
	constructor(
		private readonly chatService: ChatService,
		private readonly redisService: RedisService,
	) {}

	@Post()
	@UseAuthorized()
	async sendMessage(@UseSession() user: UserSession, @Body() dto: MessageDTO) {
		await this.chatService.createMessage(user.id, dto);
		// this.redisService.getClient().
		this.redisService;
		return {
			message: "Message sent",
		};
	}

	@Get("rooms")
	@UseAuthorized()
	async getRooms(@UseSession() user: UserSession) {
		return await this.chatService.findRooms(user.id);
	}

	@Get(":receiverId")
	@UseAuthorized()
	async getRoom(
		@UseSession() user: UserSession,
		@Param("receiverId") receiverId: string,
	) {
		return await this.chatService.getRoom(user.id, receiverId);
	}
}
