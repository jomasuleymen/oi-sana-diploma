import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import UserDTO from "src/user/dto/user.dto";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: UserDTO, done: (err: any, user: any) => void): any {
		// set as cookie body
		done(null, user);
	}

	async deserializeUser(
		payload: UserDTO,
		done: (err: any, payload: UserDTO | null) => void,
	) {
		done(null, payload);
	}
}
