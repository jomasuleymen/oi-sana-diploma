import { Course } from "src/course/entities/course.entity";
import { User } from "src/user/entities/user.entity";

export class CreateOrderDTO {
	userId: User["id"];
	courseId: Course["id"];
}
