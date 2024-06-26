import $api from "@lib/http";
import { ColumnFilter, PaginationState, SortingState } from "@tanstack/react-table";
import { toast } from "sonner";

export type PaginatedResource<T> = {
	totalItems: number;
	pageCount: number;
	items: T[];
};

export type FilterOperation =
	| "eq"
	| "neq"
	| "gt"
	| "gte"
	| "lt"
	| "lte"
	| "like"
	| "nlike"
	| "in"
	| "nin";

type ColumnFilterType =
	| ColumnFilter
	| (ColumnFilter & {
			value: any;
			operation?: FilterOperation;
	  });

export type FetchDataParams = {
	url: string;
	pagination?: PaginationState | null;
	sorting?: SortingState | null;
	columnFilters?: ColumnFilterType[] | null;
	additionalParams?: Record<string, any>;
};

const defaultOperation: FilterOperation = "eq";

export async function fetchData<TData>({
	url,
	pagination,
	sorting,
	columnFilters,
	additionalParams,
}: FetchDataParams): Promise<PaginatedResource<TData> | null> {
	var params = new URLSearchParams();

	if (additionalParams) {
		for (const key in additionalParams) {
			if (additionalParams.hasOwnProperty(key)) {
				params.append(key, additionalParams[key]);
			}
		}
	}

	if (pagination) {
		const { pageIndex, pageSize } = pagination;
		if (pageIndex) params.append("page", (pageIndex + 1).toString());
		if (pageSize) params.append("size", pageSize.toString());
	} else {
		params.append("page", "1");
		params.append("size", "10");
	}

	if (sorting) {
		for (const sort of sorting) {
			if (sort.id) {
				sort.id = String(sort.id).replaceAll("_", ".");
				params.append("sort", `${sort.id}:${sort.desc ? "desc" : "asc"}`);
			}
		}
	}

	if (columnFilters) {
		for (const filter of columnFilters) {
			const { id, value: valueWrapper } = filter;
			const value = valueWrapper?.value || valueWrapper;
			const operation = valueWrapper?.operation || defaultOperation;
			if (
				value &&
				(typeof value === "string" || Array.isArray(value) || typeof value === "number")
			) {
				params.append("filter", `${id.replaceAll("_", ".")}:${operation}:${value}`);
			}
		}
	}

	const response = await $api.get(url, { params }).catch((err: any) => {
		toast.error(err?.message || "Error while fetching data from server!");
	});

	return response?.data || null;
}
