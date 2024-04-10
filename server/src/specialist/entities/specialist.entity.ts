import { Article } from "src/article/entities/article.entity";
import { Course } from "src/course/entities/course.entity";
import { User } from "src/user/entities/user.entity";
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";

@Entity({
	name: "specialists",
})
export class Specialist {
	@PrimaryColumn()
	userId: number;

	@OneToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn()
	user: User;

	@Column({ default: false })
	isVerified: boolean;

	@Column()
	resume: string;

	@Column({ type: "varchar", nullable: true })
	about: string;

	@OneToMany(() => Course, course => course.author, {
		onDelete: "CASCADE",
	})
	courses: Course[];

	@OneToMany(() => Article, course => course.author, {
		onDelete: "CASCADE",
	})
	articles: Article[];
}
