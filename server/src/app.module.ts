import { RedisModule } from "@liaoliaots/nestjs-redis";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";

import session from "express-session";
import passport from "passport";
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { getPostgresConfig } from "./config/database.config";
import { getRedisConfig } from "./config/redis.config";
import { MailModule } from "./mail/mail.module";
import { SessionModule } from "./session/session.module";
import { SessionService } from "./session/session.service";
import { PUBLIC_PATH } from "./upload/upload.constant";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { SpecialistModule } from "./specialist/specialist.module";
import { MeditationModule } from './meditation/meditation.module';
import { BookModule } from './book/book.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env", ".env.production", ".env.development"],
		}),
		ServeStaticModule.forRoot({ rootPath: PUBLIC_PATH, exclude: ['/api/(.*)'], }),
		TypeOrmModule.forRoot(getPostgresConfig()),
		RedisModule.forRootAsync({
			inject: [ConfigService],
			useFactory: getRedisConfig,
		}),
		SessionModule,
		AuthModule,
		UserModule,
		ArticleModule,
		MailModule,
		UploadModule,
		ChatModule,
		SpecialistModule,
		MeditationModule,
		BookModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	constructor(private readonly sessionService: SessionService) {}

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				session(this.sessionService.getSessionOptions()),
				passport.initialize(),
				passport.session(),
			)
			.forRoutes("*");
	}
}
