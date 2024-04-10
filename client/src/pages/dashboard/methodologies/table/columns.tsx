import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { Methodology } from "@pages/main/methodology/methodology.service";
import { ColumnDef } from "@tanstack/react-table";
import { MethodologyCellAction } from "./cell-action-column";
import ServerImage from "@components/ui/image";

interface GenerateColumnsProps {
	onRowDeleteAction?: (methodology: Methodology) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Methodology>[] => [
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
		accessorKey: "image",
		header: (params) => <span>Image</span>,
		cell: ({ row }) => {
			return (
				<div className="w-20 h-20 flex items-center">
					<ServerImage src={row.original.image} className="w-full h-full object-fill" />
				</div>
			);
		},
	},
	{
		accessorKey: "title",
		header: (params) => <SortingHeaderCell headerContext={params} name="Title" />,
	},
	{
		accessorKey: "behaviour",
		header: () => <span>Behaviour</span>,
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<MethodologyCellAction onRowDeleteAction={onRowDeleteAction} row={row} />
		),
	},
];

export const filterableColumns: DataTableFilterableColumn<Methodology>[] = [];

export const searchableColumns: DataTableSearchableColumn<Methodology>[] = [
	{
		id: "title",
		title: "Title",
		operation: "like",
	},
];
