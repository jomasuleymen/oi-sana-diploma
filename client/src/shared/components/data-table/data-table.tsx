import { ColumnDef } from "@tanstack/react-table";

import { Table } from "@components/ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import DataTableBody from "./data-table-body";
import DataTableFooter from "./data-table-footer";
import DataTableHeader from "./data-table-header";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableFilterableColumn, DataTableSearchableColumn } from "./data-table.types";
import { useDataTable } from "@hooks/use-data-table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	url: string;
	queryKey: string;
	searchableColumns?: DataTableSearchableColumn<TData>[];
	filterableColumns?: DataTableFilterableColumn<TData>[];
	deleteRowsAction?: (rows: TData[]) => Promise<any>;
}

export function DataTable<TData, TValue>({
	columns,
	url,
	queryKey,
	searchableColumns = [],
	filterableColumns = [],
	deleteRowsAction,
}: DataTableProps<TData, TValue>) {
	const { isLoading, table } = useDataTable<TData, TValue>({
		columns,
		url,
		queryKey,
	});

	return isLoading ? (
		<DataTableSkeleton
			rowCount={5}
			columnCount={4}
			filterableColumnCount={filterableColumns.length}
			searchableColumnCount={searchableColumns.length}
		/>
	) : (
		<>
			<DataTableToolbar
				table={table}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
			/>
			<ScrollArea className="rounded-md border h-96">
				<Table className="relative">
					<DataTableHeader table={table} />
					<DataTableBody table={table} />
				</Table>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<DataTableFooter table={table} />
		</>
	);
}
