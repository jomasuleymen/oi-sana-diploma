import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class SocketAuthenticateGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest()?.request as any;
		const client = context.switchToWs().getClient() as Socket;

		if (!request) return false;

		const isAuth = request.session?.passport?.user;
		if (!isAuth && client) {
			client.disconnect();
		}

		return true;
	}
}
