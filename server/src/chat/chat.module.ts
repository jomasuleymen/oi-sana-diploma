import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseModule } from "src/course/course.module";
import { SessionModule } from "src/session/session.module";
import { SpecialistModule } from "src/specialist/specialist.module";
import { UserModule } from "src/user/user.module";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { Message } from "./entities/message.entity";

@Module({
	imports: [
		forwardRef(() => CourseModule),
		TypeOrmModule.forFeature([Message]),
		UserModule,
		SessionModule,
		SpecialistModule,
	],
	providers: [ChatGateway, ChatService],
	controllers: [ChatController],
	exports: [TypeOrmModule, ChatService],
})
export class ChatModule {}
