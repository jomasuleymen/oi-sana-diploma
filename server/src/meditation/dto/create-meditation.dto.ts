import { IsNotEmpty, IsString } from "class-validator";

export class CreateMeditationDto {
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	audio: string[];

	@IsNotEmpty()
	categoryId: number;
}
