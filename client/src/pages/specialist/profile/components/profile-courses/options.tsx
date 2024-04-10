import { Button } from "@components/ui/button";
import DeleteAlertModal from "@components/ui/delete-alert-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Course, deleteCourse } from "@pages/main/course/course.service";
import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Trash } from "lucide-react";
import React, { useState } from "react";

type Props = {
	course: Course;
};

const CourseOptions: React.FC<Props> = ({ course }) => {
	const [open, setOpen] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const onDeleteAction = async () => {
		await deleteCourse(course.id)
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ["courses"] });
			})
	};

	return (
		<div className="absolute right-4 top-2 cursor-pointer">
			{onDeleteAction && (
				<DeleteAlertModal
					isOpen={open}
					setOpen={setOpen}
					onDelete={() => onDeleteAction()}
					title={`Delete course ${course.title}?`}
				/>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="bg-white bg-opacity-40 rounded-full">
					<Button variant="ghost" className="h-6 w-6 p-0">
						<span className="sr-only">Open menu</span>
						<MoreVertical className="h-4 w-4" />
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

export default CourseOptions;
