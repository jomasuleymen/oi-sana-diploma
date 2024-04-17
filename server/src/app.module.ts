import { RedisModule } from "@liaoliaots/nestjs-redis";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import session from "express-session";
import passport from "passport";
import { AffirmationsModule } from './affirmations/affirmations.module';
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { BookModule } from "./book/book.module";
import { CallModule } from './call/call.module';
import { ChatModule } from "./chat/chat.module";
import { getPostgresConfig } from "./config/database.config";
import { getRedisConfig } from "./config/redis.config";
import { CourseModule } from "./course/course.module";
import { MailModule } from "./mail/mail.module";
import { MeditationModule } from "./meditation/meditation.module";
import { MethodologyModule } from './methodology/methodology.module';
import { NewsModule } from './news/news.module';
import { PaymentModule } from './payment/payment.module';
import { SessionModule } from "./session/session.module";
import { SessionService } from "./session/session.service";
import { SpecialistModule } from "./specialist/specialist.module";
import { UploadModule } from "./upload/upload.module";
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
		ArticleModule,
		MailModule,
		UploadModule,
		ChatModule,
		SpecialistModule,
		MeditationModule,
		BookModule,
		CourseModule,
		MethodologyModule,
		NewsModule,
		AffirmationsModule,
		CallModule,
		PaymentModule,
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
