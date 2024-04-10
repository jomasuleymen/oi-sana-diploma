import { z } from "zod";

export const methodologySchema = z.object({
	title: z.string().min(3),
	behaviour: z.string().min(1),
	image: z.string().min(1),
	actions: z
		.array(
			z.object({
				action: z.string().min(1),
			})
		)
		.min(1),
});
