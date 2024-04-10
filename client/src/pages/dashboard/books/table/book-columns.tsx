import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./book-cell-action-column";
import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import { Book } from "@pages/main/book/book.service";
import { Link } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import ServerImage from "@components/ui/image";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: Book) => Promise<any>;
}

export const generateColumns = ({ onRowDeleteAction }: GenerateColumnsProps): ColumnDef<Book>[] => [
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
		cell: ({ getValue, row }) => {
			const title = getValue() as any;
			return (
				<Link to={row.original.link} className="text-blue-700" target="_blank">
					{title}
				</Link>
			);
		},
	},
	{
		accessorKey: "image",
		header: (params) => <span>Image</span>,
		cell: ({ row }) => {
			return (
				<div className="w-32 h-44 flex items-center">
					<ServerImage src={row.original.image} className="w-full h-full object-fill" />
				</div>
			);
		},
	},
	{
		accessorKey: "author",
		header: () => <span>Author</span>,
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<Book>[] = [];

export const searchableColumns: DataTableSearchableColumn<Book>[] = [
	{
		id: "title",
		title: "Title",
		operation: "like",
	},
];
