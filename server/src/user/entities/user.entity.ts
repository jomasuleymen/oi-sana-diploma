import { Exclude } from "class-transformer";
import { Payment } from "src/payment/entities/payment.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { ROLE } from "../user-enums";

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

	@Column({ type: "varchar", nullable: true, select: false })
	@Exclude()
	password: string;

	@OneToMany(() => Payment, payment => payment.user)
	payments: Payment[];
}
