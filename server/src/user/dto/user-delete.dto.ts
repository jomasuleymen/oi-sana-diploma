import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class DeleteManyDTO {
	@IsOptional()
	@Type(() => String)
	id?: number | number[];
}
