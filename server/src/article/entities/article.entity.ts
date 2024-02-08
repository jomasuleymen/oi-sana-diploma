import { UserEntity } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "articles",
})
@Index(["title", "slug"])
@Unique(["author", "title"])
export class ArticleEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => UserEntity, {
		onDelete: "CASCADE",
		nullable: false,
	})
	author: UserEntity;

	@Column({ type: "varchar", nullable: false })
	content: string;

	@Column({ type: "varchar", nullable: false })
	@Index({ fulltext: true })
	title: string;

	@Column({ type: "varchar", nullable: false })
	@Index({ fulltext: true })
	slug: string;

	@Column({ type: "varchar", nullable: false })
	coverImage: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;
}
