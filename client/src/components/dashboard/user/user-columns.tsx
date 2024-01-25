import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/components/data-table/data-table.types";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import capitalize from "lodash/capitalize";
import { UserCellAction } from "./user-cell-action-column";
import { SortingHeaderCell } from "@/components/data-table/data-table-header-cells/sorting-header-cell";
import { User, USER_ROLE } from "@/services/user.service";

interface GenerateColumnsProps {
	onRowDeleteAction?: (user: User) => Promise<any>;
}

export const generateColumns = ({ onRowDeleteAction }: GenerateColumnsProps): ColumnDef<User>[] => [
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
		accessorKey: "name",
		header: (params) => <SortingHeaderCell headerContext={params} name="Name" />,
	},
	{
		accessorKey: "accounts",
		header: "Providers",
		cell({ getValue }) {
			const accounts = getValue() as User["accounts"];
			let providers = "";
			if (accounts)
				providers = accounts.map((account) => capitalize(account.provider)).join(", ");

			return <span>{providers}</span>;
		},
	},
	{
		accessorKey: "email",
		header: (params) => <SortingHeaderCell headerContext={params} name="Email" />,
	},
	{
		accessorKey: "role",
		header: "ROLE",
	},
	{
		accessorKey: "emailVerified",
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
		cell: ({ row }) => <UserCellAction onRowDeleteAction={onRowDeleteAction} row={row} />,
	},
];

export const filterableColumns: DataTableFilterableColumn<User>[] = [
	{
		id: "role",
		title: "Role",
		options: Object.values(USER_ROLE).map((role) => ({
			label: capitalize(role),
			value: role,
		})),
	},
];

export const searchableColumns: DataTableSearchableColumn<User>[] = [
	{
		id: "name",
		title: "Name",
	},
	{
		id: "email",
		title: "Email",
	},
];
