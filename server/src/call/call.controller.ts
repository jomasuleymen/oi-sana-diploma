import { RedisService } from "@liaoliaots/nestjs-redis";
import { Controller, Get, Param } from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import { CallService } from "./call.service";

@Controller("call")
export class CallController {
	constructor(
		private readonly callService: CallService,
		private readonly redisService: RedisService,
	) {}

	@Get("rooms")
	@UseAuthorized()
	async findVideoRooms(@UseSession() user: UserSession) {
		const redis = this.redisService.getClient();
		const keys = redis.keys(`video-room:${user.id}:*`);
		const keys2 = redis.keys(`video-room:*:${user.id}`);

		const rooms = await Promise.all([keys, keys2]);
		const roomKeys = [...rooms[0], ...rooms[1]];

		const roomIds = [];

		for (const key of roomKeys) {
			const roomId = await redis.get(key);
			if (roomId) roomIds.push(roomId);
		}

		return roomIds;
	}

	@Get(":room")
	@UseAuthorized()
	async joinRoom(
		@UseSession() user: UserSession,
		@Param("room") roomId: string,
	) {
		const token = this.callService.generateToken(user.id);
		const appId = this.callService.getAppId();
		return { roomId, token, appId };
	}
}
