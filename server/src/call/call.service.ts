import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { generateToken04 } from "./utils/token-generator";

@Injectable()
export class CallService {
	private readonly APP_ID: number;
	private readonly APP_SECRET: string;

	constructor(private readonly configService: ConfigService) {
		this.APP_ID = Number(
			this.configService.getOrThrow<number>("ZEGOCLOUD_APP_ID"),
		);
		this.APP_SECRET = this.configService.getOrThrow<string>(
			"ZEGOCLOUD_APP_SECRET",
		);
	}

	generateToken(userId: string | number) {
		return generateToken04(
			this.APP_ID,
			userId.toString(),
			this.APP_SECRET,
			3600,
		);
	}

	getCacheRoomKey(callerId: string, receiverId: string) {
		return `video-room:${callerId}:${receiverId}`;
	}
}
