import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { SpecialistModule } from "src/specialist/specialist.module";
import { Lesson } from "./entities/lesson.entity";
import { CourseReview } from "./entities/review.entity";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([Course, Lesson, CourseReview]),
		SpecialistModule,
		UserModule,
	],
	controllers: [CourseController],
	providers: [CourseService],
	exports: [CourseService],
})
export class CourseModule {}
