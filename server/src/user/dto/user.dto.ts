import { UserEntity } from "src/user/entities/user.entity";
import { USER_ROLE } from "../user-roles";

export class UserDTO implements Partial<UserEntity> {
	id: string;
	username: string;
	email: string;
	firstname?: string;
	lastname?: string;
	role: USER_ROLE;
	createdAt?: Date;
	emailVerified?: Date;
	profileImage?: string;

	public static fromEntity(user: UserEntity): UserDTO {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			role: user.role,
			createdAt: user.createdAt,
			emailVerified: user.emailVerified,
			profileImage: user.profileImage,
		};
	}
}

export default UserDTO;
