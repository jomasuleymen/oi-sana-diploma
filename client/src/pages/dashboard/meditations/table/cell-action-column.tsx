import { Button } from "@components/ui/button";
import DeleteAlertModal from "@components/ui/delete-alert-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Meditation } from "@pages/main/meditation/meditation.service";
import { Row } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
	row: Row<Meditation>;
	onRowDeleteAction?: (item: Meditation) => Promise<any>;
}

export const MeditationCellAction: React.FC<CellActionProps> = ({ row, onRowDeleteAction }) => {
	const navifate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			{onRowDeleteAction && (
				<DeleteAlertModal
					isOpen={open}
					setOpen={setOpen}
					onDelete={() => onRowDeleteAction(row.original)}
					title={`Delete post ${row.original.title}?`}
				/>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => navifate(`/dashboard/meditation/${row.original.id}`)}
					>
						<Edit className="mr-2 h-4 w-4" /> Update
					</DropdownMenuItem>

					{onRowDeleteAction && (
						<DropdownMenuItem onClick={() => setOpen(true)}>
							<Trash className="mr-2 h-4 w-4" /> Delete
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};