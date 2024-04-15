import { forwardRef, Module } from "@nestjs/common";
import { CourseModule } from "src/course/course.module";
import { UserModule } from "src/user/user.module";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";

@Module({
	imports: [
		UserModule,
		forwardRef(() => CourseModule),
		TypeOrmModule.forFeature([Payment]),
	],
	providers: [PaymentService],
	controllers: [PaymentController],
	exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
