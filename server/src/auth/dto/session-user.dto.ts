import UserDTO from "src/user/dto/user.dto";
import { USER_ROLE } from "src/user/user-roles";

export class UserSession implements Partial<UserDTO> {
	id: string;
	username: string;
	email: string;
	isAdmin: boolean;
	role: USER_ROLE;

	public static fromUserDTO(dto: UserDTO) {
		const session = new UserSession();
		session.id = dto.id;
		session.username = dto.username;
		session.email = dto.email;
		session.isAdmin = dto.isAdmin;
		session.role = dto.role;
		return session;
	}
}
