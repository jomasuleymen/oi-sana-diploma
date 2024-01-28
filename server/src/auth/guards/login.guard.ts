import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import UserLoginDTO from "../dto/login-user.dto";
import { LoginFailedException } from "../exceptions/auth.exceptions";

@Injectable()
export class LoginGuard extends AuthGuard("local") {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest() as Request;

		// TODO: dont validate
		const data = new UserLoginDTO();
		Object.assign(data, request.body || {});

		if (!data.email || !data.password) {
			throw new LoginFailedException();
		}

		// call local startegy
		const result = (await super.canActivate(context)) as boolean;
		// call validate function
		await super.logIn(request);

		return result;
	}
}
