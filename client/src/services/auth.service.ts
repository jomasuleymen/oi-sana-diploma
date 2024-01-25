import $api from "@/http/http";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { User } from "./user.service";

export const AUTH_ENDPOINT = "/auth";

export type LoginResponse = {
	message: string;
	success: boolean;
};

export type RegisterUserType = z.infer<typeof RegisterSchema>;
export type LoginUserType = z.infer<typeof LoginSchema>;

export const registerUser = async (data: RegisterUserType) => {
	return await $api.post<LoginResponse>(`${AUTH_ENDPOINT}/login`, data).then((res) => {
		return {
			message: res.data.message,
			success: res.data.success,
		};
	});
};

export const login = async (data: LoginUserType) => {
	return await $api.post<LoginResponse>(`${AUTH_ENDPOINT}/login`, data).then((res) => {
		return {
			message: res.data.message,
			success: res.data.success,
		};
	});
};

export const logout = async () => {
	return await $api
		.get(`${AUTH_ENDPOINT}/logout`)
		.then(() => {
			return {
				success: true,
			};
		})
		.catch((err) => {
			throw new Error(err?.data?.message || "Невозможно выйти из аккаунта");
		});
};

export const fetchMe = async () => {
	return await $api
		.get<User>(`${AUTH_ENDPOINT}/me`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err?.data?.message || "Невозможно получить данные о пользователе");
		});
};

type EmailVerifyResponse = {
	success: string;
	error: string;
};

export const verifyEmail = async (token: string) => {
	return await $api
		.get<EmailVerifyResponse>("email-verification", {
			params: {
				token,
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err?.data?.message || "Can not verify an email");
		});
};
