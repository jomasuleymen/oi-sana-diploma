import $api from "@lib/http";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";
import { ArticleSchema } from "@pages/main/article/article.schema";
import { z } from "zod";
import { User } from "../profile/user.service";

export type Article = {
	id: string;
	content: string;
	category: string;
	createdAt: string;
	image: string;
	slug: string;
	title: string;
	updatedAt: string;
	author: User;
};

export const ARTICLE_ENDPOINT = "/articles";

export type CreateArticleType = z.infer<typeof ArticleSchema>;

export const createArticle = async (data: CreateArticleType) => {
	const response = await $api.post<Article>(ARTICLE_ENDPOINT, data);
	return response.data;
};

type GetArticlesParams = {
	page: number;
	userId?: string;
};

export const getArticles = async (params: GetArticlesParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 10,
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
