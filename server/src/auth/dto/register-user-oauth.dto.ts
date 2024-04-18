import { PickType } from "@nestjs/mapped-types";
import UserRegisterDTO from "./register-user.dto";

class UserOAuthDTO extends PickType(UserRegisterDTO, [
	"email",
	"firstname",
	"lastname",
]) {
	profileImage?: string;
}

export default UserOAuthDTO;
