import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/components/data-table/data-table.types";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { PostCellAction } from "./post-cell-action-column";
import { SortingHeaderCell } from "@/components/data-table/data-table-header-cells/sorting-header-cell";
import { Post } from "@/services/post.service";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: Post) => Promise<any>;
}

export const generateColumns = ({ onRowDeleteAction }: GenerateColumnsProps): ColumnDef<Post>[] => [
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

export const filterableColumns: DataTableFilterableColumn<Post>[] = [];

export const searchableColumns: DataTableSearchableColumn<Post>[] = [
	{
		id: "title",
		title: "Title",
	},
];
