import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "books",
})
@Index(["title"], { unique: true })
export class Book {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 100, nullable: false })
	title: string;

	@Column({ type: "varchar", length: 100, nullable: false })
	author: string;

	@Column({ type: "varchar", length: 100, nullable: false })
	image: string;

	@Column({ type: "varchar", nullable: false })
	details: string;

	@Column({ type: "varchar", nullable: false })
	link: string;
}
