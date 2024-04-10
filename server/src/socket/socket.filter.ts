import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Catch(WsException, HttpException, Error)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
	catch(exception: WsException | HttpException | Error, host: ArgumentsHost) {
		const client = host.switchToWs().getClient() as Socket;
		if (
			!(exception instanceof HttpException) &&
			!(exception instanceof WsException)
		) {
			client.emit("error", {
				message: "Internal server error",
				code: 500,
			});
			return;
		}

		const error =
			exception instanceof WsException
				? exception.getError()
				: exception.getResponse();
		const details = error instanceof Object ? { ...error } : { message: error };
		client.emit("error", {
			...details,
		});
	}
}
