import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	author: string;

	@IsString()
	@IsNotEmpty()
	image: string;

	@IsString()
	@MinLength(10)
	details: string;

	@IsString()
	@IsNotEmpty()
	link: string;
}
