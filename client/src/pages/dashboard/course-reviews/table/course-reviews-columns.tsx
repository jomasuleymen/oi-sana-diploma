import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { CourseReview } from "@pages/main/course/course.service";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { CourseReviewCellAction } from "./course-reviews-cell-action-column";

interface GenerateColumnsProps {
	onRowDeleteAction?: (item: CourseReview) => Promise<any>;
}

export const generateColumns = ({
	onRowDeleteAction,
}: GenerateColumnsProps): ColumnDef<CourseReview>[] => [
	{
		accessorKey: "course.title",
		header: (params) => <span>Course</span>,
		cell: ({ getValue, row }) => {
			const data = row.original;
			const value = getValue() as any;
			return (
				<Link to={`/courses/${data.course.slug}`}>
					<div className="max-w-48 capitalize break-words">{value}</div>
				</Link>
			);
		},
	},
	{
		accessorKey: "review",
		header: () => <span>Review</span>,
		cell: ({ getValue }) => {
			const value = getValue() as any;
			return <div className="max-w-2xl capitalize break-words">{value}</div>;
		},
	},
	{
		accessorKey: "rate",
		header: () => <span>rate</span>,
	},
	{
		accessorKey: "user.username",
		header: () => <span>Username</span>,
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
		cell: ({ row }) => (
			<CourseReviewCellAction onRowDeleteAction={onRowDeleteAction} row={row} />
		),
	},
];

export const filterableColumns: DataTableFilterableColumn<CourseReview>[] = [];

export const searchableColumns: DataTableSearchableColumn<CourseReview>[] = [
	{
		id: "user_username",
		title: "User",
		operation: "like",
	},
];
