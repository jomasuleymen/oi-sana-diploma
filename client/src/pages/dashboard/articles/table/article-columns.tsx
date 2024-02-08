import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { PostCellAction } from "./article-cell-action-column";
import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import { Article } from "@pages/main/article/article.service";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: Article) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Article>[] => [
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
		accessorKey: "category",
		header: () => <span>Category</span>,
	},
	{
		accessorKey: "createdAt",
		header: "Created date",
		cell: ({ getValue }) => {
			const value = getValue() as any;
			if (value) {
				const date = new Date(value);
				return <span className="text-green-500">{date.toLocaleString("ru-Ru")}</span>;
			}

			return null;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <PostCellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<Article>[] = [];

export const searchableColumns: DataTableSearchableColumn<Article>[] = [
	{
		id: "title",
		title: "Title",
		operation: "like",
	},
];
