import { Specialist } from "src/specialist/entities/specialist.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "./lesson.entity";
import { CourseReview } from "./review.entity";

@Entity({
	name: "courses",
})
export class Course {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	title: string;

	@Column({ type: "varchar", nullable: true })
	description: string;

	@Column({ type: "varchar", nullable: false })
	slug: string;

	@Column({ type: "varchar", nullable: false })
	coverImage: string;

	@Column({ type: "integer", nullable: false })
	price: number;

	@Column({ type: "real", nullable: false, default: 0 })
	avgRate: number;

	@Column({ type: "integer", nullable: false, default: 0 })
	rateCount: number;

	@ManyToOne(() => Specialist, specialist => specialist.courses, {
		onDelete: "CASCADE",
	})
	author: Specialist;

	@OneToMany(() => Lesson, lesson => lesson.course, {
		cascade: ["insert", "update"],
	})
	lessons: Lesson[];

	@OneToMany(() => CourseReview, review => review.course, {
		cascade: ["insert", "update"],
	})
	reviews: CourseReview[];

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
