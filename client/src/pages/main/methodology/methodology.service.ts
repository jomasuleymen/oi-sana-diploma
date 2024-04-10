import $api from "@lib/http";
import { z } from "zod";
import { methodologySchema } from "./methodology.schema";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";

export type Methodology = {
	id: number;
	title: string;
	behaviour: string;
	image: string;
	actions: {
		action: string;
	}[];
};

export const METHODOLOGIES_ENDPOINT = "/methodologies";

export type CreateMethodologyType = z.infer<typeof methodologySchema>;

export const createMethodology = async (data: CreateMethodologyType) => {
	const response = await $api.post<Methodology>(METHODOLOGIES_ENDPOINT, data);
	return response.data;
};

export const getMethodology = async (id: number | string) => {
	const response = await $api.get<Methodology>(`${METHODOLOGIES_ENDPOINT}/${id}`);
	return response.data;
};

export const getMethodologies = async () => {
	const response = await $api.get<Methodology[]>(`${METHODOLOGIES_ENDPOINT}/all`);
	return response.data;
};
