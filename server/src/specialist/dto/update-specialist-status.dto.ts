import { Type } from "class-transformer";
import { IsBoolean } from "class-validator";

export class UpdateSpecialistStatusDTO {
	@Type(() => Boolean)
	@IsBoolean()
	isVerified: boolean;
}
