import $api from "@/http/http";

export const USER_ENDPOINT = "/user";

export type User = {
	id: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	role: USER_ROLE;
	isAdmin: boolean;
	accounts?: {
		provider: string;
	}[];
};

export enum USER_ROLE {
	ADMIN = "ADMIN",
	SPECIAL = "SPECIAL",
	USER = "USER",
}

export type LoginResponse = {
	message: string;
	success: boolean;
};

export const deleteUser = async (id: string) => {
	return await $api.delete(`${USER_ENDPOINT}/${id}`).then((res) => {
		return {
			message: res.data.message,
			success: res.data.success,
		};
	});
};
