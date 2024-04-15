import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
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

	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber("KZ")
	phone: string;
}

export default SpecialistRegisterDTO;
