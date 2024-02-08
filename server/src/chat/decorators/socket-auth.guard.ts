import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class SocketAuthenticateGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest()?.request as any;
		if (!request) return false;

		const isAuth = request.session?.passport?.user;
		if (!isAuth) throw new WsException(new UnauthorizedException());

		return true;
	}
}
