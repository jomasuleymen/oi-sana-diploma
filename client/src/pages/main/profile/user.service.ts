import $api from "@lib/http";

export const USER_ENDPOINT = "/users";

export enum USER_ROLE {
	ADMIN = "ADMIN",
	SPECIAL = "SPECIAL",
	USER = "USER",
}

export type User = {
	id: string;
	username: string;
	email: string;
	emailVerified: string;
	firstname?: string;
	lastname?: string;
	profileImage?: string;
	createdAt: string;
	role: string;
	isAdmin: boolean;
};

export type LoginResponse = {
	message: string;
};

export const deleteUser = async (id: string) => {
	return await $api.delete(`${USER_ENDPOINT}/${id}`).then((res) => {
		return res.data;
	});
};

export const getUser = async (userId: string) => {
	return await $api.get<User>(`${USER_ENDPOINT}/${userId}`).then((res) => {
		return res.data;
	});
};
