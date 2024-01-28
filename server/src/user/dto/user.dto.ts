import { UserEntity } from "src/user/entities/user.entity";
import { USER_ROLE } from "../user-roles";

export class UserDTO implements Partial<UserEntity> {
	id: string;
	username: string;
	email: string;
	firstname?: string;
	lastname?: string;
	isAdmin: boolean;
	role: USER_ROLE;
	createdAt?: Date;
	emailVerified?: Date;
	profileImage?: string;
	updatedAt?: Date;

	public static fromEntity(user: UserEntity): UserDTO {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			isAdmin: user.role == USER_ROLE.ADMIN,
			role: user.role,
			createdAt: user.createdAt,
			emailVerified: user.emailVerified,
			profileImage: user.profileImage,
			updatedAt: user.updatedAt,
		};
	}
}

export default UserDTO;
