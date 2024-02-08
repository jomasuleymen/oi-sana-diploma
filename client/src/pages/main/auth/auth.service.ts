import $api from "@lib/http";
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from "@pages/main/auth/auth.schema";
import { z } from "zod";
import { User } from "../profile/user.service";

export const AUTH_ENDPOINT = "/auth";

export type RegisterUserType = z.infer<typeof RegisterSchema>;
export type LoginUserType = z.infer<typeof LoginSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export const registerUser = async (data: RegisterUserType) => {
	return await $api.post(`${AUTH_ENDPOINT}/register`, data).then((res) => res.data);
};

export const login = async (data: LoginUserType) => {
	return await $api.post(`${AUTH_ENDPOINT}/login`, data).then((res) => res.data);
};

export const logout = async () => {
	return await $api.get(`${AUTH_ENDPOINT}/logout`).then((res) => res.data);
};

export const forgotPassword = async (email: string) => {
	return await $api
		.get(`${AUTH_ENDPOINT}/forgot-password`, { params: { email } })
		.then((res) => res.data);
};

export const resetPassword = async (data: ResetPasswordType, token: string) => {
	return await $api
		.post(`${AUTH_ENDPOINT}/reset-password`, { ...data, token })
		.then((res) => res.data);
};

export const fetchMe = async () => {
	return await $api
		.get<User>(`${AUTH_ENDPOINT}/me`)
		.then((res) => res.data)
		.catch((err) => null);
};

export const verifyEmail = async (token: string) => {
	return await $api
		.get(`${AUTH_ENDPOINT}/email-verification`, {
			params: {
				token,
			},
		})
		.then((res) => res.data);
};
