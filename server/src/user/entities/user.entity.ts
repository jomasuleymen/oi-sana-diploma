import { Exclude } from "class-transformer";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { ROLE } from "../user-roles";

@Entity({
	name: "users",
})
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

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

	@Column({ type: "timestamptz", default: null })
	emailVerified: Date;

	@Column({ type: "varchar", nullable: true })
	profileImage?: string;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;

	@Index()
	@Column({
		type: "enum",
		enum: ROLE,
		default: ROLE.USER,
		nullable: false,
	})
	role: ROLE;

	@Column({ type: "varchar", nullable: false, select: false })
	@Exclude()
	password: string;
}
