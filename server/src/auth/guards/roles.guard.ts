import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request;
		const roles = this.reflector.get<string[]>("roles", context.getHandler());

		const user = request.user;
		if (!user) throw new ForbiddenException();

		if (user.isAdmin) return true;

		const isAccess = roles.includes(user.role);
		if (!isAccess) throw new ForbiddenException();

		return true;
	}
}
