import { RedisService } from "@liaoliaots/nestjs-redis";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import RedisStore from "connect-redis";
import session, { SessionData, Store } from "express-session";
import UserDTO from "src/user/dto/user.dto";
import { WEEK } from "time-constants";

type UserSession = UserDTO;

@Injectable()
export class SessionService {
	private readonly sessionStore: Store;
	private readonly sessionOptions: session.SessionOptions;

	constructor(
		private readonly redis: RedisService,
		private readonly config: ConfigService,
	) {
		this.sessionStore = new RedisStore({
			client: this.redis.getClient(),
			prefix: "sid:",
		});

		this.sessionOptions = {
			store: this.sessionStore,
			saveUninitialized: true,
			secret: this.config.get<string>("SESSION_SECRET", "secret"),
			resave: false,
			cookie: {
				sameSite: false,
				secure: false,
				httpOnly: false,
				maxAge: WEEK,
			},
		};
	}

	deleteUserSessions(userIds: string | string[]) {
		if (typeof userIds == "string") userIds = [userIds];

		this.sessionStore.all?.((err, sessionsData) => {
			if (!sessionsData) return;
			const sessions: SessionData[] = Object.values(sessionsData);

			sessions.forEach((session: any) => {
				const user: UserSession = session?.passport?.user;
				if (user && userIds.includes(user.id)) {
					this.sessionStore.destroy(session.id, err => {
						if (err) {
							console.log("error while destroing session: ", err);
						}
					});
				}
			});
		});
	}

	public getSessionOptions() {
		return this.sessionOptions;
	}
}
