import { UserSession } from "src/auth/dto/session-user.dto";

declare module "django-hash";

declare global {
	namespace Express {
		export interface Request {
			user: UserSession;
		}
	}
}
