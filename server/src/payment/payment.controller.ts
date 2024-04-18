import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import {
	Filtering,
	FilteringParams,
} from "src/decorators/filtering-params.decorator";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";
import {
	Sorting,
	SortingParams,
} from "src/decorators/sorting-params.decorator";
import { ROLE } from "src/user/user-enums";
import { PaymentCallbackOrderDTO } from "./dto/callback-order.dto";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post("callback")
	async callBack(@Body() callbackDto: PaymentCallbackOrderDTO) {
		if (callbackDto.status === 1) {
			return this.paymentService.completePayment(callbackDto.orderId);
		}

		throw new BadRequestException(callbackDto.errMessage);
	}

	@Get()
	@UseAuthorized(ROLE.ADMIN)
	async findAll(
		@PaginationParams() pagination: Pagination,
		@SortingParams<Payment>(["paidAt"]) sort?: Sorting[],
		@FilteringParams<Payment>([])
		filter?: Filtering[],
	) {
		return await this.paymentService.findAll(pagination, sort, filter);
	}

	@Get("statistics/amount")
	@UseAuthorized(ROLE.ADMIN)
	async amountStatistics() {
		return await this.paymentService.getAmountStatistics();
	}

	@Get("statistics/sales")
	@UseAuthorized(ROLE.ADMIN)
	async salesStatistics() {
		return await this.paymentService.getSalesStatistics();
	}

	@Get("statistics/amount/month")
	@UseAuthorized(ROLE.ADMIN)
	async amountStatisticsByMonth() {
		return await this.paymentService.getAmountStatisticsByMonth();
	}
}
