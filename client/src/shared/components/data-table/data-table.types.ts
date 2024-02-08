import { FilterOperation } from "@utils/data-fetcher";

export type DataTableFilterOption = {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableSearchableColumn<TData> {
	id: keyof TData;
	title: string;
	operation: FilterOperation;
}

export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
	options: DataTableFilterOption[];
}
