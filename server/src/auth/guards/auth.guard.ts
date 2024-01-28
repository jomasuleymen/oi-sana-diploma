import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthenticateGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request;

		const isAuth = request.isAuthenticated();
		if (!isAuth) throw new UnauthorizedException();

		return true;
	}
}
