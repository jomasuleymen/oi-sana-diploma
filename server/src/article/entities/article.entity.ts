import { Specialist } from "src/specialist/entities/specialist.entity";
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
export class Article {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Specialist, specialist => specialist.articles, {
		onDelete: "CASCADE",
	})
	author: Specialist;

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

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
