import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { Checkbox } from "@components/ui/checkbox";
import { Meditation } from "@pages/main/meditation/meditation.service";
import { ColumnDef } from "@tanstack/react-table";
import Plyr from "plyr-react";
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
		accessorKey: "category.name",
		header: () => <span>Category</span>,
		cell: ({ getValue }) => {
			const value = getValue() as any;
			return <div className="max-w-36 break-words">{value}</div>;
		},
	},
	{
		accessorKey: "audio",
		header: () => <span>Audio</span>,
		cell: ({ getValue }) => {
			return (
				<div>
					<Plyr
						width="100%"
						source={{
							type: "audio",
							sources: [
								{
									src:
										import.meta.env.VITE_SERVER_URL +
										"/uploads/stream/" +
										getValue(),
									type: "audio/mp3",
								},
							],
						}}
						options={{
							settings: [],
							controls: ["play", "progress", "play-large", "current-time"],
						}}
					/>
				</div>
			);
		},
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

export const filterableColumns: DataTableFilterableColumn<Meditation>[] = [];

export const searchableColumns: DataTableSearchableColumn<Meditation>[] = [
	{
		id: "category_name",
		title: "category",
		operation: "like",
	},
];
