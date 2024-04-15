import {
	BadGatewayException,
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

import { RedisService } from "@liaoliaots/nestjs-redis";
import { isString } from "class-validator";
import { UserSession } from "src/auth/dto/session-user.dto";
import SocketUseSession from "src/chat/decorators/socket-use-session.decorator";
import { SocketAuthenticateGuard } from "src/guards/socket-auth.guard";
import { WebsocketExceptionsFilter } from "src/socket/socket.filter";
import { UserService } from "src/user/user.service";

@WebSocketGateway()
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(new ValidationPipe())
export class CallGateway {
	@WebSocketServer() server: Server;

	constructor(
		private readonly userService: UserService,
		private readonly redisService: RedisService,
	) {}

	@UseGuards(SocketAuthenticateGuard)
	@SubscribeMessage("create-video-room")
	async videoCall(
		@MessageBody("roomId") roomId: string,
		@SocketUseSession() user: UserSession,
	) {
		if (!roomId || !isString(roomId))
			throw new BadGatewayException("roomId is required");

		const callerId = String(user.id);
		const [, id1, id2] = roomId.split("_");
		const receiverId = callerId === id1 ? id2 : id1;

		const redis = this.redisService.getClient();
		const receiverClientIds = await redis.lrange(`user:${receiverId}`, 0, -1);
		const hostClientIds = await redis.lrange(`user:${callerId}`, 0, -1);

		const callerUser = await this.userService.findById(+callerId);
		const receiverUser = await this.userService.findById(+receiverId);

		if (!callerUser || !receiverUser) {
			throw new BadGatewayException("User not found");
		}

		// Notify the receiver about the incoming call
		this.server
			.to([...hostClientIds, ...receiverClientIds])
			.emit("created-video-room", {
				roomId,
				host: {
					id: callerUser.id,
					username: callerUser.username,
					profileImage: callerUser.profileImage,
				},
				receiver: {
					id: receiverUser.id,
					username: receiverUser.username,
					profileImage: receiverUser.profileImage,
				},
			});
	}

	@UseGuards(SocketAuthenticateGuard)
	@SubscribeMessage("close-video-room")
	async closeVideoRoom(
		@MessageBody("roomId") roomId: string,
		@SocketUseSession() user: UserSession,
	) {
		if (!roomId || !isString(roomId))
			throw new BadGatewayException("roomId is required");

		const callerId = String(user.id);
		const [, id1, id2] = roomId.split("_");
		const receiverId = callerId === id1 ? id2 : id1;

		const redis = this.redisService.getClient();
		const receiverClientIds = await redis.lrange(`user:${receiverId}`, 0, -1);
		const hostClientIds = await redis.lrange(`user:${callerId}`, 0, -1);

		// Notify the receiver about the incoming call
		this.server
			.to([...hostClientIds, ...receiverClientIds])
			.emit("closed-video-room", {
				roomId,
			});
	}
}
