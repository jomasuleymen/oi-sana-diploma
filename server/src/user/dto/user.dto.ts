import { User } from "src/user/entities/user.entity";
import { ROLE } from "../user-roles";

export class UserDTO implements Partial<User> {
	id: number;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	role: ROLE;
	createdAt?: Date;
	emailVerified?: Date;
	profileImage?: string;

	public static fromEntity(user: User): UserDTO {
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
