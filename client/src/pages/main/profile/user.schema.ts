import { z } from "zod";

export const UserFieldsSchema = z.object({
	username: z.string().min(6, {
		message: "Username must be at least 6 characters long",
	}),
	email: z.string().email({ message: "Email is required" }),
	password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
		message:
			"Password is too weak",
	}),
});
