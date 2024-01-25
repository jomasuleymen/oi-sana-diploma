import { Exclude } from "class-transformer";
import { USER_ROLE } from "./user-roles";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "users",
})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Index()
	@Column({ type: "varchar", length: 30, unique: true, nullable: false })
	username: string;

	@Index()
	@Column({ type: "varchar", unique: true, nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: true })
	firstname: string;

	@Column({ type: "varchar", nullable: true })
	lastname: string;

	@Index()
	@Column({
		default: USER_ROLE.USER,
		enum: Object.values(USER_ROLE),
	})
	role: USER_ROLE;

	@Column({ type: "varchar", nullable: false })
	@Exclude()
	password: string;
}
