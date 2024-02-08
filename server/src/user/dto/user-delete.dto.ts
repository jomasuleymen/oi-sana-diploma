import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class UserDeleteDTO {
	@IsOptional()
	@Type(() => String)
	id?: string | string[];
}
