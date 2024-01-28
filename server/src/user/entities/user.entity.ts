import { Exclude } from "class-transformer";
import { USER_ROLE } from "../user-roles";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { ArticleEntity } from "src/article/entities/article.entity";

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

	@Column({ type: "timestamp", default: null })
	emailVerified: Date;

	@Column({ type: "varchar", nullable: true })
	firstname?: string;

	@Column({ type: "varchar", nullable: true })
	lastname?: string;

	@Column({ type: "varchar", nullable: true })
	profileImage?: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Index()
	@Column({
		type: "enum",
		enum: USER_ROLE,
		default: USER_ROLE.USER,
		nullable: false,
	})
	role: USER_ROLE;

	@Column({ type: "varchar", nullable: false })
	@Exclude()
	password: string;

	@OneToMany(() => ArticleEntity, article => article.author, {
		onDelete: "CASCADE",
	})
	articles: ArticleEntity[];
}
