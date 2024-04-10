import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course.entity";
import { User } from "src/user/entities/user.entity";

@Entity({
	name: "coursesReview",
})
export class CourseReview {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "integer", nullable: false })
	rate: number;

	@Column({ type: "varchar", nullable: false })
	review: string;

	@ManyToOne(() => Course, course => course.reviews, {
		onDelete: "CASCADE",
	})
	course: Course;

	@ManyToOne(() => User, {
		onDelete: "CASCADE",
	})
	user: User;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
