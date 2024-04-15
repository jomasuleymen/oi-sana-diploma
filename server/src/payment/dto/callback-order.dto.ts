import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaymentCallbackOrderDTO {
	@IsString()
	id: string;

	@IsString()
	orderId: string;

	@IsNumber()
	status: number;

	@IsOptional()
	description: string;

	@IsNumber()
	amount: number;

	@IsNumber()
	commission: number;

	@IsString()
	@IsOptional()
	errMessage: string;
}
