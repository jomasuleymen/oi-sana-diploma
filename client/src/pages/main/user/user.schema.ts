import { z } from "zod";

export const UserFieldsSchema = z.object({
	username: z.string().min(3, {
		message: "Username must be at least 3 characters long",
	}),
	firstname: z.string().min(1, {
		message: "Field can not be empty",
	}),
	lastname: z.string().min(1, {
		message: "Field can not be empty",
	}),
	email: z.string().email({ message: "Email is required" }),
	password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
		message: "Password is too weak",
	}),
});

export const UserProfileSchema = z.object({
	profileImage: z.string().optional(),
});

export const SpecialistProfileSchema = UserProfileSchema.extend({
	about: z.string().optional(),
});
