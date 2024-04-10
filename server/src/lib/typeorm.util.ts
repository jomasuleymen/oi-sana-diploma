import _ from "lodash";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import {
	FindOptionsWhere,
	ILike,
	In,
	IsNull,
	LessThan,
	LessThanOrEqual,
	MoreThan,
	MoreThanOrEqual,
	Not,
} from "typeorm";

export const getOrder = (sorts?: Sorting[]) => {
	if (!sorts) return {};

	const result: any = {};
	for (const sort of sorts) {
		if (sort) _.set(result, sort.property, sort.direction);
	}
	return result;
};

export enum FilterRule {
	EQUALS = "eq",
	NOT_EQUALS = "neq",
	GREATER_THAN = "gt",
	GREATER_THAN_OR_EQUALS = "gte",
	LESS_THAN = "lt",
	LESS_THAN_OR_EQUALS = "lte",
	LIKE = "like",
	NOT_LIKE = "nlike",
	IN = "in",
	NOT_IN = "nin",
	IS_NULL = "isnull",
	IS_NOT_NULL = "isnotnull",
}

const ruleMappings = {
	[FilterRule.IS_NULL]: () => IsNull(),
	[FilterRule.IS_NOT_NULL]: () => Not(IsNull()),
	[FilterRule.EQUALS]: (value: any) => value,
	[FilterRule.NOT_EQUALS]: (value: any) => Not(value),
	[FilterRule.GREATER_THAN]: (value: any) => MoreThan(value),
	[FilterRule.GREATER_THAN_OR_EQUALS]: (value: any) => MoreThanOrEqual(value),
	[FilterRule.LESS_THAN]: (value: any) => LessThan(value),
	[FilterRule.LESS_THAN_OR_EQUALS]: (value: any) => LessThanOrEqual(value),
	[FilterRule.LIKE]: (value: any) => ILike(`%${value}%`),
	[FilterRule.NOT_LIKE]: (value: any) => Not(ILike(`%${value}%`)),
	[FilterRule.IN]: (value: any) => In(value.split(",")),
	[FilterRule.NOT_IN]: (value: any) => Not(In(value.split(","))),
};

export const getWhere = <T>(filters?: Filtering[]): FindOptionsWhere<T> => {
	if (!filters) return {};

	const transformedFilters = filters.reduce((acc: any, filter) => {
		const transformFunction = ruleMappings[filter.rule as FilterRule];
		if (transformFunction) {
			_.set(acc, filter.property, transformFunction(filter.value as any));
		}
		return acc;
	}, {});

	return transformedFilters;
};

export type PaginatedResource<T> = {
	totalItems: number;
	pageCount: number;
	items: T[];
};
