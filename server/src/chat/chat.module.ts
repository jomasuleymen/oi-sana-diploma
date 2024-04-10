import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionModule } from "src/session/session.module";
import { UserModule } from "src/user/user.module";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { Message } from "./entities/message.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Message]), UserModule, SessionModule],
	providers: [ChatGateway, ChatService],
	controllers: [ChatController],
	exports: [TypeOrmModule, ChatService],
})
export class ChatModule {}
