import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { MeditationCategory } from "./meditation-catergory.entity";

@Entity({
	name: "meditation",
})
export class Meditation {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column("varchar", {
		nullable: false,
	})
	audio: string;

	@ManyToOne(() => MeditationCategory, category => category.meditations, {
		onDelete: "CASCADE",
	})
	category: MeditationCategory;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
