import { RedisService } from "@liaoliaots/nestjs-redis";
import { Injectable } from "@nestjs/common";
import RedisStore from "connect-redis";
import { SessionData, Store } from "express-session";
import UserDTO from "src/user/dto/user.dto";

type UserSession = UserDTO;

@Injectable()
export class SessionService {
	private readonly sessionStore: Store;

	constructor(private readonly redis: RedisService) {
		this.sessionStore = new RedisStore({
			client: this.redis.getClient(),
			prefix: "sid:",
		});
	}

	deleteUserSessions(userId: string) {
		this.sessionStore.all?.((err, sessionsData) => {
			if (!sessionsData) return;
			const sessions: SessionData[] = Object.values(sessionsData);

			sessions.forEach((session: any) => {
				const user: UserSession = session?.passport?.user;
				if (!user || user.id != userId) return;

				this.sessionStore.destroy(session.id, err => {
					if (err) {
						console.log("error while destroing session: ", err);
					}
				});
			});
		});
	}

	getSessionStore() {
		return this.sessionStore;
	}
}
