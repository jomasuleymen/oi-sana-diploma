import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { User } from "../entities/user.entity";

export class UserUpdateDTO implements Partial<User> {
	@IsOptional()
	@Type(() => String)
	profileImage?: string;
}
