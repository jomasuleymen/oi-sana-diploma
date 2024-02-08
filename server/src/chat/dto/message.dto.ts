import { IsNotEmpty, IsString } from "class-validator";

export class MessageDTO {
	@IsNotEmpty()
	@IsString()
	roomId: string;

	@IsNotEmpty()
	@IsString()
	content: string;
}
