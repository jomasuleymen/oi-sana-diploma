import {
	Column,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity({
	name: "affirmations",
})
export class Affirmation {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", nullable: false })
	image: string;
}
