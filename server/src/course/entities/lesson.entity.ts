import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity({
	name: "lessons",
})
export class Lesson {
	@PrimaryGeneratedColumn("increment")
	id: string;

	@Column({ type: "varchar", nullable: false })
	title: string;

	@Column({ type: "varchar", nullable: false })
	video: string;

	@ManyToOne(() => Course, course => course.lessons, {
		onDelete: "CASCADE",
	})
	course: Course;
}
