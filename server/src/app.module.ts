import { RedisModule } from "@liaoliaots/nestjs-redis";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import session from "express-session";
import passport from "passport";
import { AuthModule } from "./auth/auth.module";
import { getPostgresConfig } from "./config/database.config";
import { getRedisConfig } from "./config/redis.config";
import { SessionModule } from "./session/session.module";
import { SessionService } from "./session/session.service";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env", ".env.production", ".env.development"],
		}),
		TypeOrmModule.forRoot(getPostgresConfig()),
		RedisModule.forRootAsync({
			inject: [ConfigService],
			useFactory: getRedisConfig,
		}),
		SessionModule,
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	constructor(
		private readonly sessionService: SessionService,
		private readonly config: ConfigService,
	) {}

	configure(consumer: MiddlewareConsumer) {
		const sessionStore = this.sessionService.getSessionStore();
		const oneDay = 1000 * 60 * 60 * 24;

		consumer
			.apply(
				session({
					store: sessionStore,
					saveUninitialized: true,
					secret: this.config.get<string>("SESSION_SECRET", "secret"),
					resave: false,
					cookie: {
						sameSite: false,
						secure: false,
						httpOnly: false,
						maxAge: oneDay * 7,
					},
				}),
				passport.initialize(),
				passport.session(),
			)
			.forRoutes("*");
	}
}
