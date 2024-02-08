import { z } from "zod";

export const ArticleSchema = z.object({
	coverImage: z.string(),
	title: z.string(),
	content: z.string(),
});
