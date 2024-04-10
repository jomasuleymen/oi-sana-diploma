import UserDTO from "src/user/dto/user.dto";
import { ROLE } from "src/user/user-roles";

export class UserSession implements Partial<UserDTO> {
	id: number;
	username: string;
	email: string;
	isAdmin: boolean;
	isSpecialist: boolean;
	role: ROLE;

	public static fromUserDTO(dto: UserDTO) {
		const session = new UserSession();
		session.id = dto.id;
		session.username = dto.username;
		session.email = dto.email;
		session.isAdmin = dto.role == ROLE.ADMIN;
		session.isSpecialist = dto.role == ROLE.SPECIAL;
		session.role = dto.role;
		return session;
	}
}
