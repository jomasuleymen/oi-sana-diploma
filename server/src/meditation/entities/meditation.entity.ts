import {
	Column,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { MeditationCategoryEntity } from "./meditation-catergory.entity";

@Entity({
	name: "meditation",
})
@Index(["title"], { unique: true })
export class MeditationEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column("varchar", {
		length: 255,
		nullable: false,
	})
	title: string;

	@Column("varchar", {
		length: 255,
		nullable: false,
	})
	video: string;

	@ManyToOne(() => MeditationCategoryEntity, category => category.meditations, {
		onDelete: "CASCADE",
	})
	category: MeditationCategoryEntity;
}
