import { FetchDataParams, fetchData } from "@/shared/utils/data-fetcher";
import $api from "@lib/http";
import { z } from "zod";
import { BookSchema } from "./book.schema";

export const BOOKS_ENDPOINT = "/books";

export type CreateBookType = z.infer<typeof BookSchema>;

export const createBook = async (data: CreateBookType) => {
	const response = await $api.post<Book>(BOOKS_ENDPOINT, data);
	return response.data;
};

type GetArticlesParams = {
	page: number;
};

export type Book = {
	id: number;
	title: string;
	author: string;
	image: string;
	details: string;
};

export const getBooks = async (params: GetArticlesParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 10,
		pageIndex: params.page - 1,
	};

	const response = await fetchData<Book>({
		url: BOOKS_ENDPOINT,
		pagination,
	});
	return response;
};
