import { Injectable, InternalServerErrorException } from "@nestjs/common";
import bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";
import UserLoginDTO from "./dto/user-login.dto";
import UserRegisterDTO from "./dto/user-register.dto";
import LoginFailedException from "./exceptions/loginFailed.exception";
import UserDTO, { mapUserToDTO } from "src/user/dto/user.dto";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(dto: UserRegisterDTO) {
		const created = await this.userService.createUser(dto);
		if (!created) throw new InternalServerErrorException();

		return created;
	}

	async validateUser(dto: UserLoginDTO): Promise<UserDTO> {
		const user = await this.userService.findByEmailOrUsername(dto.username);
		if (!user) throw new LoginFailedException();

		const isPasswordCorrect = bcrypt.compareSync(dto.password, user.password);
		if (!isPasswordCorrect) throw new LoginFailedException();

		const userDto = mapUserToDTO(user);

		return userDto;
	}
}
