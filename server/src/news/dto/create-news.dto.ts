import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateNewsDto {
	@IsString()
	@MinLength(5)
	@MaxLength(120)
	title: string;

	@IsString()
	@MaxLength(255)
	@IsOptional()
	description?: string;

	@IsString()
	image?: string;

	@IsString()
	@MinLength(5)
	content: string;
}
