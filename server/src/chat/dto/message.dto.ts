import { IsNotEmpty, IsString } from "class-validator";

export class MessageDTO {
	@IsNotEmpty()
	tempId: string;

	@IsNotEmpty()
	receiverId: string;

	@IsNotEmpty()
	@IsString()
	content: string;
}
