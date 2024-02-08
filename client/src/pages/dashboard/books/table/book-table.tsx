import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/tailwind.utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./book-columns";
import { Book } from "@pages/main/book/book.service";

const API_ENDPOINT = "/books";
const QUERY_KEY = "books";

const deleteBooks = async (books: Book | Book[]) => {
	const id = Array.isArray(books) ? books.map((book) => book.id) : books.id;
	return $api.delete(API_ENDPOINT, { data: { id } });
};

export const BooksTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (book: Book | Book[]) => {
			await deleteBooks(book)
				.catch((err) => {})
				.finally(() => {
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				});
		},
		[queryClient, queryKey]
	);

	const columns = useMemo(
		() => generateColumns({ onRowDeleteAction: deleteRowsAction }),
		[deleteRowsAction]
	);

	return (
		<div className={cn("h-full flex-1 space-y-4 pt-6")}>
			<div className="flex items-start justify-between">
				<Heading
					title="Books"
					description="Manage books"
					addNewLink="/dashboard/books/new"
				/>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
