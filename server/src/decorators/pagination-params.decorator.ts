import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";
import { Request } from "express";

export interface Pagination {
	page: number;
	index: number;
	limit: number;
	size: number;
	offset: number;
}


// e.g. ?page=1&size=10
export const PaginationParams = createParamDecorator(
	(data, ctx: ExecutionContext): Pagination => {
		const req: Request = ctx.switchToHttp().getRequest();
		const page = parseInt(req.query.page as string) || 1;
		const size = parseInt(req.query.size as string) || 10;

		// check if page and size are valid
		if (page < 1 || size < 0) {
			throw new BadRequestException("Invalid pagination params");
		}
		// do not allow to fetch large slices of the dataset
		if (size > 100) {
			throw new BadRequestException(
				"Invalid pagination params: Max size is 100",
			);
		}

		// calculate pagination parameters
		const index = page - 1;
		const limit = size;
		const offset = index * limit;
		return { page, index, limit, size, offset };
	},
);
