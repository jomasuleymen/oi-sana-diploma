import { Button } from "@components/ui/button";
import DeleteAlertModal from "@components/ui/delete-alert-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Article } from "@pages/main/article/article.service";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

interface PostCellActionProps {
	row: Row<Article>;
	onRowDeleteAction?: (post: Article) => Promise<any>;
}

export const PostCellAction: React.FC<PostCellActionProps> = ({ row, onRowDeleteAction }) => {
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
