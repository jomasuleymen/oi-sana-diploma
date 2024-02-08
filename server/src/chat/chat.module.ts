import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { MessageEntity } from "./entities/message.entity";
import { RoomEntity } from "./entities/room.entity";
import { SessionModule } from "src/session/session.module";

@Module({
	imports: [TypeOrmModule.forFeature([MessageEntity, RoomEntity]), UserModule, SessionModule],
	providers: [ChatGateway, ChatService],
	controllers: [ChatController],
	exports: [TypeOrmModule, ChatService],
})
export class ChatModule {}
