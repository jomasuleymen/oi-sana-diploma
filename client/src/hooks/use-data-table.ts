import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFacetedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { dataTableFetch } from "@/components/data-table/data-table-fetcher";
import { useDebounce } from "@/hooks/use-debounce";
import { usePagination } from "@/hooks/use-pagination";
import { useSorting } from "@/hooks/use-sorting";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface UseDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	url: string;
	queryKey: string;
}

export function useDataTable<TData, TValue>({
	columns,
	queryKey,
	url,
}: UseDataTableProps<TData, TValue>) {
	const { onPaginationChange, pagination } = usePagination({ pageSize: 10 });
	const { onSortingChange, sorting } = useSorting();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const columnFiltersDebouned = useDebounce<ColumnFiltersState>(columnFilters, 700);

	const { data, isLoading } = useQuery<any, any, any>({
		queryKey: [queryKey, url, pagination, sorting, columnFiltersDebouned],
		queryFn: () =>
			dataTableFetch({
				url,
				pagination,
				sorting,
				columnFilters: columnFiltersDebouned,
			}),
		placeholderData: keepPreviousData,
	});

	const table = useReactTable({
		data: data?.data || [],
		columns,
		pageCount: data?.pageCount || -1,

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),

		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		onPaginationChange: onPaginationChange,
		onSortingChange: onSortingChange,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			pagination,
			columnFilters,
		},
	});

	return {
		isLoading,
		table,
	};
}
