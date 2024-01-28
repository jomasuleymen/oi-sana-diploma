import { UserEntity } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "articles",
})
export class ArticleEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToMany(() => UserEntity, user => user.articles, { onDelete: "CASCADE" })
	author: UserEntity;

	@Column({ type: "varchar", nullable: false })
	content: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	@Index({ fulltext: true })
	title: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	@Index({ fulltext: true })
	slug: string;

	@Column({ type: "varchar", nullable: false })
	coverImage: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
