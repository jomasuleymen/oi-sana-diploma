import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import UserDTO from "src/user/dto/user.dto";
import { UserSession } from "../dto/session-user.dto";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: UserDTO, done: (err: any, user: any) => void): any {
		// put user session into memory store
		done(null, UserSession.fromUserDTO(user));
	}

	async deserializeUser(
		payload: UserSession,
		done: (err: any, payload: UserSession | null) => void,
	) {
		done(null, payload);
	}
}
