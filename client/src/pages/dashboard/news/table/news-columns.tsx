import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./news-cell-action-column";
import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import { NewsArticle } from "@pages/main/home/services/news.service";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: NewsArticle) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<NewsArticle>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: (params) => <SortingHeaderCell headerContext={params} name="Title" />,
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<NewsArticle>[] = [];

export const searchableColumns: DataTableSearchableColumn<NewsArticle>[] = [];
