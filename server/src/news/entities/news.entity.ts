import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
	name: "news",
})
export class News {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", nullable: false })
	title: string;

	@Column({ type: "varchar", nullable: true, default: null })
	description?: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	slug: string;

	@Column({ type: "varchar", nullable: true, default: null })
	image?: string;

	@Column({ type: "text", nullable: false })
	content: string;

	@CreateDateColumn({ type: "timestamptz", nullable: false })
	createdAt: Date;
}
