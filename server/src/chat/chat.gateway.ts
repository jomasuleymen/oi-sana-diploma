import { UseGuards } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from "@nestjs/websockets";
import session from "express-session";
import passport from "passport";
import { Server, Socket } from "socket.io";
import { UserSession } from "src/auth/dto/session-user.dto";
import { SessionService } from "src/session/session.service";
import { SocketAuthenticateGuard } from "./decorators/socket-auth.guard";
import SocketUseSession from "./decorators/socket-use-session.decorator";
import { MessageDTO } from "./dto/message.dto";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;

	constructor(private readonly sessionService: SessionService) {}

	@UseGuards(SocketAuthenticateGuard)
	@SubscribeMessage("message")
	message(
		@MessageBody() createChatDto: MessageDTO,
		@ConnectedSocket() client: Socket,
		@SocketUseSession() user: UserSession,
	): WsResponse<MessageDTO> {
		console.log({
			user,
			createChatDto,
			clientId: client.id,
		});
		// this.server.to(client.id).emit("message", createChatDto);
		return { data: createChatDto, event: "message" };
	}

	@SubscribeMessage("createChat")
	create(@MessageBody() createChatDto: MessageDTO) {
		console.log(createChatDto);
		// return this.chatService.create(createChatDto);
	}

	afterInit(server: Server) {
		server.engine.use(session(this.sessionService.getSessionOptions()));
		server.engine.use(passport.initialize());
		// server.engine.use(passport.session());
		//Выполняем действия
	}

	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`);
		//Выполняем действия
	}

	handleConnection(client: Socket) {
		console.log(client.id);
		// client.disconnect();
		//Выполняем действия
	}
}
