import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { Meditation } from "@pages/main/meditation/meditation.service";
import { ColumnDef } from "@tanstack/react-table";
import { MeditationCellAction } from "./cell-action-column";

interface GenerateColumnsProps {
	onRowDeleteAction?: (meditation: Meditation) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Meditation>[] => [
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
		cell: ({ row }) => <MeditationCellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<Meditation>[] = [
	{
		id: "category",
		title: "Category",
		operation: "in",
		options: []
	},
];

export const searchableColumns: DataTableSearchableColumn<Meditation>[] = [
	{
		id: "title",
		title: "Title",
		operation: "like",
	},
];
