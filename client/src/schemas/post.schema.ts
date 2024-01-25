import { z } from "zod";

export const PostSchema = z.object({
	id: z.string(),
	userId: z.string(),
	content: z.string(),
	title: z.string(),
	image: z.string(),
});
