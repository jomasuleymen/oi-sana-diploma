import $api from "@lib/http";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";
import { z } from "zod";
import { MeditationCategorySchema, MeditationSchema } from "./meditation.schema";

export type Meditation = {
	id: number;
	title: string;
	video: string;
	category: MeditationCategory;
};

export const MEDITATION_ENDPOINT = "/meditations";

export type CreateMeditationType = z.infer<typeof MeditationSchema>;

export const createMeditation = async (data: CreateMeditationType) => {
	const response = await $api.post<Meditation>(MEDITATION_ENDPOINT, data);
	return response.data;
};

type GetMeditationsParams = {
	page: number;
	userId?: string;
};

export const getMeditations = async (params: GetMeditationsParams = { page: 1 }) => {
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

	const response = await fetchData<Meditation>({
		url: MEDITATION_ENDPOINT,
		pagination,
		columnFilters: filters,
	});
	return response;
};

export type MeditationCategory = {
	id: number;
	name: string;
	image: string;
};

export type CreateMeditationCategoryType = z.infer<typeof MeditationCategorySchema>;

export const createMeditationCategory = async (data: CreateMeditationCategoryType) => {
	const response = await $api.post(`${MEDITATION_ENDPOINT}/categories`, data);
	return response.data;
};

export const fetchCategories = async () => {
	const response = await $api.get<MeditationCategory[]>(`${MEDITATION_ENDPOINT}/categories`);
	return response.data;
};
