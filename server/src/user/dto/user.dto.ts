import { UserEntity } from "src/user/user.entity";
import { USER_ROLE } from "../user-roles";

class UserDTO implements Partial<UserEntity> {
	id: string;
	username: string;
	email: string;
	isAdmin: boolean;
	role: USER_ROLE;
}

export function mapUserToDTO(user: UserEntity): UserDTO {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		isAdmin: user.role == USER_ROLE.ADMIN,
		role: user.role,
	};
}

export default UserDTO;
