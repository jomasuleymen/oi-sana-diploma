import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";
import { Request } from "express";
import UserLoginDTO from "../dto/user-login.dto";
import LoginFailedException from "../exceptions/loginFailed.exception";

@Injectable()
export class LoginGuard extends AuthGuard("local") {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest() as Request;

		// TODO: dont validate
		const data = new UserLoginDTO();
		Object.assign(data, request.body || {});

		const errors = await validate(data);
		if (errors.length > 0) {
			throw new LoginFailedException();
		}

		try {
			// call local startegy
			const result = (await super.canActivate(context)) as boolean;
			// call serializeUser funciton
			await super.logIn(request);

			return result;
		} catch (err) {
			throw new LoginFailedException();
		}
	}
}
