import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "methodologies",
})
@Index(["title"], { unique: true })
export class Methodology {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 100, nullable: false })
	title: string;

	@Column({ type: "varchar", length: 100, nullable: false })
	image: string;

	@Column({ type: "varchar", nullable: false })
	behaviour: string;

	@Column({
		type: "jsonb",
		nullable: false,
		default: () => "'[]'",
		array: false,
	})
	actions: Array<any>;
}
