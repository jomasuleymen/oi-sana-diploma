import $api from "@lib/http";
import { User } from "@pages/main/user/user.service";
import { fetchData, FetchDataParams } from "@utils/data-fetcher";

export const SPECIALISTS_ENDPOINT = "/specialists";

export type Specialist = {
	userId: number;
	isVerified: boolean;
	user: User;
	resume: string;
	about?: string;
	phone?: string;
};

export const getSpecialist = async (id: string) => {
	return await $api.get<Specialist>(`${SPECIALISTS_ENDPOINT}/${id}`).then((res) => {
		return res.data;
	});
};

type GetSpecialistsParams = {
	page: number;
	name?: string;
};

export const getSpecialists = async (params: GetSpecialistsParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 100,
		pageIndex: params.page - 1,
	};

	const filters: FetchDataParams["columnFilters"] = [];

	if (params.name) {
		filters.push({
			id: "user.username",
			value: {
				value: params.name,
				operation: "like",
			},
		});
	}

	const response = await fetchData<Specialist>({
		url: SPECIALISTS_ENDPOINT,
		pagination,
		columnFilters: filters,
	});
	return response;
};

export const updateSpecialistStatus = async (id: string, isVerified: boolean) => {
	return await $api
		.patch<Specialist>(`${SPECIALISTS_ENDPOINT}/${id}`, { isVerified })
		.then((res) => {
			return res.data;
		});
};
