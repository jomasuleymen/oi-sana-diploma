import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";
import { Request } from "express";
import { FilterRule } from "src/lib/typeorm.util";

export interface Filtering {
	property: string;
	rule: string;
	value: string;
}

// valid filter rules

const getFilter = (filter: string, available: any[]): Filtering => {
	if (
		!filter.match(
			/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/,
		) &&
		!filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
	) {
		throw new BadRequestException("Invalid filter parameter");
	}

	// extract the parameters and validate if the rule and the property are valid
	const [property, rule, value] = filter.split(":");
	if (!available.includes(property))
		throw new BadRequestException(`Invalid filter property: ${property}`);
	if (!Object.values(FilterRule).includes(rule as FilterRule))
		throw new BadRequestException(`Invalid filter rule: ${rule}`);

	return { property, rule, value };
};

// e.g. ?filter=createdAt:gte:2020-01-01
export const FilteringParams = <T>(validParams: Array<keyof T>) =>
	createParamDecorator((_, ctx: ExecutionContext): Filtering[] | null => {
		const req: Request = ctx.switchToHttp().getRequest();
		const filters = req.query.filter as string;
		if (!filters) return null;

		if (typeof filters === "string") return [getFilter(filters, validParams)];
		if (Array.isArray(filters)) {
			const result: Filtering[] = [];
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			for (const filter of filters) {
				if (filter) result.push(getFilter(filter, validParams));
			}
			return result;
		}

		return null;
	})();
