import { Injectable } from "@nestjs/common";
import { generateToken04 } from "./utils/token-generator";

@Injectable()
export class CallService {
	// @WebSocketServer() private readonly server: Server;

	// constructor(private readonly redisService: RedisService) {}

	private generateToken(userId: string | number) {
		const appID = 146140608;
		const serverSecret = "a3b32455f70b0d1aaa75fedbfe0e0abf";

		return generateToken04(appID, userId.toString(), serverSecret, 3600, "");
	}

	async joinRoom(roomId: string, userId: number) {
		// const redis = this.redisService.getClient();

		const token = this.generateToken(userId);
		// const clientIds = await redis.lrange(`user:${id1}`, 0, -1);
		// redis.a
		return { roomId, token };
	}
}
