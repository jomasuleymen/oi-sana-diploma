import UserDTO from "src/user/dto/user.dto";

declare module 'django-hash';

declare global {
	namespace Express {
		export interface Request {
			user: UserDTO;
		}
	}
}
