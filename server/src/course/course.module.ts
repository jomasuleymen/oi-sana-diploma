import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatModule } from "src/chat/chat.module";
import { PaymentModule } from "src/payment/payment.module";
import { SpecialistModule } from "src/specialist/specialist.module";
import { UserModule } from "src/user/user.module";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { Course } from "./entities/course.entity";
import { Lesson } from "./entities/lesson.entity";
import { CourseReview } from "./entities/review.entity";

@Module({
	imports: [
		forwardRef(() => PaymentModule),
		forwardRef(() => ChatModule),
		SpecialistModule,
		UserModule,
		TypeOrmModule.forFeature([Course, Lesson, CourseReview]),
	],
	controllers: [CourseController],
	providers: [CourseService],
	exports: [TypeOrmModule, CourseService],
})
export class CourseModule {}
