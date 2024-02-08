import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateMeditationDto {
	@IsString()
	@MinLength(3)
	title: string;

	@IsString()
	@MinLength(3)
	video: string;

	@IsNotEmpty()
	categoryId: number;
}
