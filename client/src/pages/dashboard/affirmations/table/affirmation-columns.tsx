import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import ServerImage from "@components/ui/image";
import { Affirmation } from "@pages/main/home/services/affirmation.service";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./affirmation-cell-action-column";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: Affirmation) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Affirmation>[] => [
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
				<div className="min-w-44 min-h-44 max-w-44 max-h-44 flex items-center">
					<ServerImage src={row.original.image} className="w-full h-full object-cover" />
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<Affirmation>[] = [];

export const searchableColumns: DataTableSearchableColumn<Affirmation>[] = [];
