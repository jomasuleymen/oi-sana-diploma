import { z } from "zod";
import { UserFieldsSchema } from "./user.schema";

export const LoginSchema = z.object({
	email: z.string().min(1, {
		message: "Field can not be empty",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export const RegisterSchema = UserFieldsSchema.extend({
	confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});
