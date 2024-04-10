import { UserFieldsSchema } from "@pages/main/user/user.schema";
import { z } from "zod";

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

export const SpecialistRegisterSchema = UserFieldsSchema.extend({
	confirmPassword: z.string(),
	resume: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export const ResetPasswordSchema = UserFieldsSchema.pick({ password: true })
	.extend({
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
