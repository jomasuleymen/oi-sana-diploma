import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Meditation } from "./meditation.entity";

@Entity({
	name: "meditation_category",
})
@Index(["name"], { unique: true })
export class MeditationCategory {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column("varchar", {
		length: 255,
		nullable: false,
	})
	name: string;

	@Column("varchar", {
		length: 255,
		nullable: false,
	})
	image: string;

	@OneToMany(() => Meditation, meditation => meditation.category, {
		onDelete: "CASCADE",
	})
	meditations: Meditation[];
}
