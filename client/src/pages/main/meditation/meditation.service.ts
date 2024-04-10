import $api from "@lib/http";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";
import { z } from "zod";
import { MeditationCategorySchema, MeditationSchema } from "./meditation.schema";

export type Meditation = {
	id: number;
	audio: string;
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
	category?: string;
};

export const getMeditations = async (params: GetMeditationsParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 100,
		pageIndex: params.page - 1,
	};

	const filters: FetchDataParams["columnFilters"] = [];

	if (params.category) {
		filters.push({
			id: "category.id",
			value: params.category,
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
	meditations: { id: string }[];
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

export const deleteCategory = async (id: number) => {
	const response = await $api.delete(`${MEDITATION_ENDPOINT}/categories/${id}`);
	return response.data;
};
