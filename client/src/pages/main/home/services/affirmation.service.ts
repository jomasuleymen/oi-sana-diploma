import $api from "@lib/http";
import { z } from "zod";

export const AFFIRMATIONS_ENDPOINT = "/affirmations";

export const affirmationSchema = z.object({
	image: z.string(),
});
export type CreateAffirmationType = z.infer<typeof affirmationSchema>;

export const createAffirmation = async (data: CreateAffirmationType) => {
	const response = await $api.post<Affirmation>(AFFIRMATIONS_ENDPOINT, data);
	return response.data;
};

export type Affirmation = {
	id: number;
	image: string;
};

export const getAffirmations = async () => {
	const response = await $api.get<Affirmation[]>(`${AFFIRMATIONS_ENDPOINT}/all`);
	return response.data;
};
