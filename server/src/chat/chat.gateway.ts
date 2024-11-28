import {
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import session from "express-session";
import passport from "passport";
import { Server, Socket } from "socket.io";
import { UserSession } from "src/auth/dto/session-user.dto";
import { SessionService } from "src/session/session.service";
import { ChatService } from "./chat.service";
import { SocketAuthenticateGuard } from "../guards/socket-auth.guard";
import SocketUseSession from "./decorators/socket-use-session.decorator";
import { MessageDTO } from "./dto/message.dto";

import { RedisService } from "@liaoliaots/nestjs-redis";
import { IncomingMessage } from "http";
import { WebsocketExceptionsFilter } from "src/socket/socket.filter";

@WebSocketGateway()
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(new ValidationPipe())
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;

	constructor(
		private readonly chatService: ChatService,
		private readonly sessionService: SessionService,
		private readonly redisService: RedisService,
	) {}

	@UseGuards(SocketAuthenticateGuard)
	@SubscribeMessage("send-message")
	async sendMessage(
		@MessageBody() createChatDto: MessageDTO,
		@ConnectedSocket() client: Socket,
		@SocketUseSession() user: UserSession,
	) {
		const message = await this.chatService.sendMessage(user.id, createChatDto);

		const messageDTO = {
			id: message.id,
			content: message.content,
			date: message.createdAt,
			delivered: message.delivered,
			read: message.read,
			senderId: message.sender.id,
			roomId: message.roomId,
		};

		this.sendMessageToClients(message.sender.id, {
			...messageDTO,
			tempId: createChatDto.tempId,
		});
		this.sendMessageToClients(message.receiver.id, messageDTO);
	}

	async sendMessageToClients(userId: number, data: any) {
		const redis = this.redisService.getOrThrow();

		const clientIds = await redis.lrange(`user:${userId}`, 0, -1);
		if (clientIds.length > 0) {
			this.server.to(clientIds).emit("new-message", data);
		}
	}

	afterInit(server: Server) {
		server.engine.use(session(this.sessionService.getSessionOptions()));
		server.engine.use(passport.initialize());

		// clear all clients on server restart
		const redis = this.redisService.getOrThrow();
		redis.del("client:*", "user:*");
	}

	async handleDisconnect(client: Socket) {
		const redis = this.redisService.getOrThrow();
		const userId = await redis.get(`client:${client.id}`);
		if (userId) {
			await redis.lrem(`user:${userId}`, 1, client.id);
			await redis.del(`client:${client.id}`);
		}
	}

	async handleConnection(client: Socket) {
		const request = client.request as IncomingMessage & Record<string, any>;
		const user = request?.session?.passport?.user as UserSession | undefined;

		if (!user) {
			client.disconnect(true);
		} else {
			const redis = this.redisService.getOrThrow();
			await redis.lpush(`user:${user.id}`, client.id);
			await redis.set(`client:${client.id}`, user.id);
		}
	}
}
