import { IsNotEmpty } from "class-validator";

class UserLoginDTO {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;
}

export default UserLoginDTO;
