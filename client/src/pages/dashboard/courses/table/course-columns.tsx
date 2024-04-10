import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { PostCellAction } from "./course-cell-action-column";
import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import { Course } from "@pages/main/course/course.service";
import { Link } from "react-router-dom";

interface GenerateColumnsProps {
	onRowDeleteAction?: (iten: Course) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Course>[] => [
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
			const value = getValue() as any;
			return (
				<Link
					to={`/courses/${row.original.slug}`}
					target="_blank"
					className="text-blue-600"
				>
					{value}
				</Link>
			);
		},
	},
	{
		accessorKey: "author.user.username",
		header: () => "Author",
	},
	{
		accessorKey: "price",
		header: () => "Price",
	},
	{
		accessorKey: "avgRate",
		header: () => "Rating",
	},
	{
		accessorKey: "rateCount",
		header: () => "Rate count",
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

export const filterableColumns: DataTableFilterableColumn<Course>[] = [];

export const searchableColumns: DataTableSearchableColumn<Course>[] = [
	{
		id: "title",
		title: "Title",
		operation: "like",
	},
];
