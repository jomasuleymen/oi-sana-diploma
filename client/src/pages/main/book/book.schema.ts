import { z } from "zod";

export const BookSchema = z.object({
	title: z.string().min(1),
	author: z.string().min(1),
	image: z.string().min(1),
	details: z.string().min(1),
	link: z.string().min(1),
});
