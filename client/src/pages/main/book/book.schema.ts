import { z } from "zod";

export const BookSchema = z.object({
	title: z.string(),
	author: z.string(),
	image: z.string(),
	details: z.string(),
});
