import { Course } from "src/course/entities/course.entity";
import { User } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";

@Entity({
	name: "payments",
})
export class Payment {
	@PrimaryColumn("uuid")
	orderId: string;

	@ManyToOne(() => User, user => user.payments)
	user: User;

	@ManyToOne(() => Course, course => course.payments)
	course: Course;

	@Column("decimal", { precision: 10, scale: 2 })
	amount: number;

	@Column("boolean")
	isPaid: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@Column("timestamptz", { nullable: true, default: null })
	paidAt: Date;
}
