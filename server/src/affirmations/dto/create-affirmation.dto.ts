import { IsString } from "class-validator";

export class CreateAffirmationDto {
	@IsString()
	image: string;
}
