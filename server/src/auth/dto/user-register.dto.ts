import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

class UserRegisterDTO {
	@IsNotEmpty()
	@IsNotEmpty()
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword({
		minLength: 4,
		minNumbers: 0,
		minUppercase: 0,
		minSymbols: 0,
		minLowercase: 0,
	})
	password: string;
}

export default UserRegisterDTO;
