import $api from "@lib/http";
import { ArticleSchema } from "@pages/main/article/article.schema";
import { Specialist } from "@pages/specialist/specialist.service";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";
import { z } from "zod";

export type Article = {
	id: string;
	content: string;
	category: string;
	createdAt: string;
	coverImage: string;
	slug: string;
	title: string;
	updatedAt: string;
	author: Specialist;
};

export const ARTICLE_ENDPOINT = "/articles";

export type CreateArticleType = z.infer<typeof ArticleSchema>;

export const createArticle = async (data: CreateArticleType) => {
	const response = await $api.post<Article>(ARTICLE_ENDPOINT, data);
	return response.data;
};

export const deleteArticle = async (id: number | string) => {
	const response = await $api.delete(`${ARTICLE_ENDPOINT}/${id}`);
	return response.data;
};

type GetArticlesParams = {
	page: number;
	userId?: number;
};

export const getArticles = async (params: GetArticlesParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 100,
		pageIndex: params.page - 1,
	};

	const filters: FetchDataParams["columnFilters"] = [];

	if (params.userId) {
		filters.push({
			id: "author",
			value: params.userId,
		});
	}

	const response = await fetchData<Article>({
		url: ARTICLE_ENDPOINT,
		pagination,
		columnFilters: filters,
	});
	return response;
};

export const getArticle = async (slug: string) => {
	const response = await $api.get<Article>(`${ARTICLE_ENDPOINT}/${slug}`);
	return response.data;
};
