import $api from "@lib/http";
import { SPECIALISTS_ENDPOINT } from "@pages/specialist/specialist.service";
import { fetchData } from "@utils/data-fetcher";
import { z } from "zod";
import { SpecialistProfileSchema } from "./user.schema";

export const USER_ENDPOINT = "/users";

export enum USER_ROLE {
	ADMIN = "ADMIN",
	SPECIAL = "SPECIAL",
	USER = "USER",
}

export type User = {
	id: number;
	username: string;
	email: string;
	emailVerified: string;
	firstname?: string;
	lastname?: string;
	profileImage?: string;
	createdAt: string;
	role: string;
	isAdmin: boolean;
	isSpecialist: boolean;
};

export type LoginResponse = {
	message: string;
};

export const deleteUser = async (id: string) => {
	return await $api.delete(`${USER_ENDPOINT}/${id}`).then((res) => {
		return res.data;
	});
};

export type UpdateProfileType = z.infer<typeof SpecialistProfileSchema>;
export const updateUserProfile = async (id: string, data: UpdateProfileType) => {
	return await $api.put<any>(`${USER_ENDPOINT}`, data).then((res) => {
		return res.data;
	});
};

export const updateSpecialistProfile = async (id: string, data: UpdateProfileType) => {
	return await $api.put<any>(`${SPECIALISTS_ENDPOINT}`, data).then((res) => {
		return res.data;
	});
};

export const getUser = async (userId: string) => {
	return await $api.get<User>(`${USER_ENDPOINT}/${userId}`).then((res) => {
		return res.data;
	});
};

export const getUsers = async () => {
	const response = await fetchData<User>({
		url: USER_ENDPOINT,
	});
	return response;
};
