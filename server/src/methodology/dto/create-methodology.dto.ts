import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";

class ActionDTO {
	@IsString()
	@IsNotEmpty()
	action: string;
}

export class CreateMethodologyDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	image: string;

	@IsString()
	@IsNotEmpty()
	behaviour: string;

	@IsArray()
	@IsObject({ each: true })
	@IsNotEmpty()
	@Type(() => ActionDTO)
	actions: Array<any>;
}
