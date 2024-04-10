import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import UserRegisterDTO from "../../auth/dto/register-user.dto";

class SpecialistRegisterDTO extends PickType(UserRegisterDTO, [
	"username",
	"email",
	"password",
	"firstname",
	"lastname",
] as const) {
	@IsNotEmpty()
	resume: string;
}

export default SpecialistRegisterDTO;
