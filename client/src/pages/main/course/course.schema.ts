import { z } from "zod";

export const LessonSchema = z.object({
	title: z.string().min(1),
	video: z.string().min(1),
});

export const CourseSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(5),
	coverImage: z.string().min(1),
	price: z.string().min(1),
	lessons: z.array(LessonSchema).nonempty(),
});
