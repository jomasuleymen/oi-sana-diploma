import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

class UserRegisterDTO {
	@IsNotEmpty()
	@MinLength(4)
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword(
		{
			minLength: 6,
			minNumbers: 1,
			minUppercase: 1,
			minSymbols: 0,
			minLowercase: 1,
		},
		{
			message: "Password is too weak",
		},
	)
	password: string;
}

export default UserRegisterDTO;
