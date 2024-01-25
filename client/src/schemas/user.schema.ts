import { z } from "zod";

export const UserFieldsSchema = z.object({
	name: z.string().min(2, {
		message: "Username is required",
	}),
	email: z.string().email({ message: "Email is required" }),
	password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
		message:
			"Password must contain at least one lowercase letter, one uppercase letter, and one digit. The minimum length is 6 characters.",
	}),
});
