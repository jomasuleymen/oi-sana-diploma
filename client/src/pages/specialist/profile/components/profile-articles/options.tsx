import { Button } from "@components/ui/button";
import DeleteAlertModal from "@components/ui/delete-alert-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Article, deleteArticle } from "@pages/main/article/article.service";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";

type Props = {
	article: Article;
};

const ArticleOptions: React.FC<Props> = ({ article }) => {
	const [open, setOpen] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const onDeleteAction = async () => {
		await deleteArticle(article.id).then(() => {
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			setOpen(false);
		});
	};

	return (
		<div className="absolute right-2 top-1 cursor-pointer">
			{onDeleteAction && (
				<DeleteAlertModal
					isOpen={open}
					setOpen={setOpen}
					onDelete={() => onDeleteAction()}
					title={`Delete article ${article.title}?`}
				/>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer">
						<Trash className="mr-2 h-4 w-4" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ArticleOptions;
