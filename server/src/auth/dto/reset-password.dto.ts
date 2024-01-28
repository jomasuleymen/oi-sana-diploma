import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import UserRegisterDTO from "./register-user.dto";

class ResetPasswordDTO extends PickType(UserRegisterDTO, ["password"]) {
	@IsNotEmpty()
	token: string;
}

export default ResetPasswordDTO;
