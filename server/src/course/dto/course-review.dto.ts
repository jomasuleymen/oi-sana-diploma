import {
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	Min
} from "class-validator";

export class CourseReviewDTO {
	@IsNumber()
	@Min(1)
	@Max(5)
	rate: number;

	@IsString()
	@IsNotEmpty()
	review: string;
}
