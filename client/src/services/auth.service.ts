import $api from "@/http/http";
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { User } from "./user.service";

export const AUTH_ENDPOINT = "/auth";

export type RegisterUserType = z.infer<typeof RegisterSchema>;
export type LoginUserType = z.infer<typeof LoginSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export const registerUser = async (data: RegisterUserType) => {
	return await $api
		.post(`${AUTH_ENDPOINT}/register`, data)
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while registering",
				success: false,
			};
		});
};

export const login = async (data: LoginUserType) => {
	return await $api
		.post(`${AUTH_ENDPOINT}/login`, data)
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while logging in",
				success: false,
			};
		});
};

export const logout = async () => {
	return await $api
		.get(`${AUTH_ENDPOINT}/logout`)
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while registering",
				success: false,
			};
		});
};

export const forgotPassword = async (email: string) => {
	return await $api
		.get(`${AUTH_ENDPOINT}/forgot-password`, { params: { email } })
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while registering",
				success: false,
			};
		});
};

export const resetPassword = async (data: ResetPasswordType, token: string) => {
	return await $api
		.post(`${AUTH_ENDPOINT}/reset-password`, { ...data, token })
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Some error occured",
				success: false,
			};
		});
};

export const fetchMe = async () => {
	return await $api
		.get<User>(`${AUTH_ENDPOINT}/me`)
		.then((res) => {
			return {
				message: res.data,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while registering",
				success: false,
			};
		});
};

export const verifyEmail = async (token: string) => {
	return await $api
		.get(`${AUTH_ENDPOINT}/email-verification`, {
			params: {
				token,
			},
		})
		.then((res) => {
			return {
				message: res.data.message,
				success: true,
			};
		})
		.catch((err) => {
			return {
				message: err?.data?.message || "Error while registering",
				success: false,
			};
		});
};
