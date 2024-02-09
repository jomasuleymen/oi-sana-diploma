import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthenticateGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request;
		console.log(request.headers);
		console.log(request.body);
		const isAuth = request.isAuthenticated();
		if (!isAuth) throw new UnauthorizedException();

		return true;
	}
}
