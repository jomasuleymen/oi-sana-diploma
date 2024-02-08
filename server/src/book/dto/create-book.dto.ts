import { IsNotEmpty, IsString } from "class-validator";

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
	@IsNotEmpty()
	details: string;
}
