import { SortingHeaderCell } from "@components/data-table/data-table-header-cells/sorting-header-cell";
import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { Specialist } from "@pages/specialist/specialist.service";
import { ColumnDef } from "@tanstack/react-table";
import { SpecialistCellAction } from "./cell-action-column";

interface GenerateColumnsProps {
	onRowDeleteAction?: (specialist: Specialist) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<Specialist>[] => [
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
		accessorKey: "user.username",
		header: (params) => <SortingHeaderCell headerContext={params} name="Username" />,
	},
	{
		accessorKey: "user.email",
		header: (params) => <SortingHeaderCell headerContext={params} name="Email" />,
	},
	{
		accessorKey: "user.emailVerified",
		header: "Email Verified",
		cell: ({ getValue }) => {
			const value = getValue() as any;

			if (value) {
				const date = new Date(value);
				return <span className="text-green-500">{date.toLocaleString("ru-Ru")}</span>;
			}

			return <span className="text-red-500">No</span>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <SpecialistCellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<Specialist>[] = [];

export const searchableColumns: DataTableSearchableColumn<Specialist>[] = [
	{
		id: "user_username",
		title: "Username",
		operation: "like",
	},
];
