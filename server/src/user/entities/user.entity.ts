import { Exclude } from "class-transformer";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { USER_ROLE } from "../user-roles";

@Entity({
	name: "users",
})
export class UserEntity {
	@PrimaryGeneratedColumn("increment")
	id: string;

	@Column({ type: "varchar", length: 30, unique: true, nullable: false })
	username: string;

	@Index()
	@Column({ type: "varchar", length: 120, nullable: true })
	firstname: string;

	@Index()
	@Column({ type: "varchar", length: 120, nullable: true })
	lastname: string;

	@Index()
	@Column({ type: "varchar", unique: true, nullable: false })
	email: string;

	@Column({ type: "timestamp", default: null, select: false })
	emailVerified: Date;

	@Column({ type: "varchar", nullable: true })
	profileImage?: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@Index()
	@Column({
		type: "enum",
		enum: USER_ROLE,
		default: USER_ROLE.USER,
		nullable: false,
	})
	role: USER_ROLE;

	@Column({ type: "varchar", nullable: false, select: false })
	@Exclude()
	password: string;
}
