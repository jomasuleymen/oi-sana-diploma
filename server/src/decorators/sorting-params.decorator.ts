import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";
import { Request } from "express";

export interface Sorting {
	property: string;
	direction: string;
}

const getSorting = (sort: string, available: any[]): Sorting => {
	const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
	if (!sort.match(sortPattern))
		throw new BadRequestException("Invalid sort parameter");

	const [property, direction] = sort.split(":");
	if (!available.includes(property))
		throw new BadRequestException(`Invalid sort property: ${property}`);

	return { property, direction };
};
// e.g. ?sort=createdAt:desc
export const SortingParams = <T>(validParams: Array<keyof T>) =>
	createParamDecorator((_, ctx: ExecutionContext): Sorting[] | null => {
		const req: Request = ctx.switchToHttp().getRequest();
		const sorts = req.query.sort as string;
		if (!sorts) return null;

		if (typeof sorts === "string") return [getSorting(sorts, validParams)];
		if (Array.isArray(sorts)) {
			const result: Sorting[] = [];
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			for (const sort of sorts) {
				if (sort) result.push(getSorting(sort, validParams));
			}
			return result;
		}

		return null;
	})();
