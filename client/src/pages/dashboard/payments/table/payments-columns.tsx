import {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@components/data-table/data-table.types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Payment } from "../payments.service";

export const generateColumns = (): ColumnDef<Payment>[] => [
	{
		accessorKey: "course",
		header: (params) => "Course",
		cell: ({ getValue, row }) => {
			const course = row.original.course;

			return (
				<Link to={`/courses/${course.slug}`} target="_blank" className="text-blue-600">
					{course.title}
				</Link>
			);
		},
	},
	{
		accessorKey: "author",
		header: (params) => "Author",
		cell: ({ getValue, row }) => {
			const author = row.original.course.author.user;

			return (
				<Link to={`/specialists/${author.id}`} target="_blank" className="text-blue-600">
					{author.firstname} {author.lastname}
				</Link>
			);
		},
	},
	{
		accessorKey: "user",
		header: (params) => "Payer",
		cell: ({ getValue, row }) => {
			const payer = row.original.user;

			return (
				<div>
					{payer.firstname} {payer.lastname}
				</div>
			);
		},
	},
	{
		accessorKey: "amount",
		header: (params) => "Amount",
	},

	{
		accessorKey: "orderId",
		header: () => "Payment id",
	},
	{
		accessorKey: "paidAt",
		header: "Paid date",
		cell: ({ getValue }) => {
			const value = getValue() as any;
			if (value) {
				const date = new Date(value);
				return <span className="text-green-500">{date.toLocaleString("ru-Ru")}</span>;
			}

			return null;
		},
	},
];

export const filterableColumns: DataTableFilterableColumn<Payment>[] = [];

export const searchableColumns: DataTableSearchableColumn<Payment>[] = [];
