import { Transform, Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	Min,
	MinLength,
	ValidateNested,
} from "class-validator";

export class CreateCourseDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	description: string;

	@IsString()
	@IsNotEmpty()
	coverImage: string;

	@Transform(({ value }) => parseFloat(value))
	@IsNumber()
	@Min(0)
	price: number;

	@IsArray()
	@Type(() => LessonDto)
	@ValidateNested()
	@ArrayMinSize(1)
	lessons: LessonDto[];
}

export class LessonDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	title: string;

	@IsString()
	@IsNotEmpty()
	video: string;
}
