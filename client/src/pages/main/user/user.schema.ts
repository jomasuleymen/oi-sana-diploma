import { z } from "zod";

export const UserFieldsSchema = z.object({
	username: z.string().min(6, {
		message: "Username must be at least 6 characters long",
	}),
	firstname: z.string().min(6, {
		message: "Firstname must be at least 6 characters long",
	}),
	lastname: z.string().min(6, {
		message: "Lastname must be at least 6 characters long",
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
