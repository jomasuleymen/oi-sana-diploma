import { z } from "zod";

export const MeditationSchema = z.object({
	title: z.string().min(3),
	categoryId: z.string().min(1),
	video: z.string().min(1),
});

export const MeditationCategorySchema = z.object({
	name: z.string().min(3),
	image: z.string().min(1),
});
