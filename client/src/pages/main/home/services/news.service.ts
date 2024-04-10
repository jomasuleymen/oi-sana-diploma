import $api from "@lib/http";
import { fetchData, FetchDataParams } from "@utils/data-fetcher";
import { z } from "zod";

export const NEWS_ENDPOINT = "/news";

export const newsSchema = z.object({
	title: z.string().min(5),
	description: z.string().min(5).optional(),
	image: z.string().optional(),
	content: z.string().min(5),
});

export type CreateNewsType = z.infer<typeof newsSchema>;

export const createNews = async (data: CreateNewsType) => {
	const response = await $api.post<NewsArticle>(NEWS_ENDPOINT, data);
	return response.data;
};

export type NewsArticle = {
	id: number;
	title: string;
	description?: string;
	slug: string;
	image?: string;
	content: string;
	createdAt: string;
};

type GetNewsParams = {
	page: number;
};

export const getNews = async (params: GetNewsParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 100,
		pageIndex: params.page - 1,
	};

	const response = await fetchData<NewsArticle>({
		url: NEWS_ENDPOINT,
		pagination,
	});

	return response;
};

export const getNewsArticle = async (slug: string) => {
	const response = await $api.get<NewsArticle>(`${NEWS_ENDPOINT}/${slug}`);
	return response.data;
};
