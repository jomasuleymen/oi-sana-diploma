import { z } from "zod";

export const MeditationSchema = z.object({
	categoryId: z.string().min(1),
	audio: z.array(z.string().min(1)).min(1),
});

export const MeditationCategorySchema = z.object({
	name: z.string().min(3),
	image: z.string().min(1),
});
