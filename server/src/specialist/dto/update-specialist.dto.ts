import { PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { UserUpdateDTO } from "src/user/dto/user-update.dto";

export class UpdateSpecialistDTO extends PickType(UserUpdateDTO, [
	"profileImage",
]) {
	@Type(() => String)
	@IsOptional()
	about?: string;
}
