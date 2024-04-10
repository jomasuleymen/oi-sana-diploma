import slugify from "slugify";
import { generateRandomHash } from "./hash";

export function slugifyText(text: string) {
	// Split the text into words using whitespace as delimiter
	const words = text.split(/\s+/);

	// Slice the array to get the first 12 words
	const first12Words = words.slice(0, 12);
	first12Words.push(generateRandomHash(10));

	// Join the words back into a string and return
	const slug = first12Words.join(" ");

	return slugify(slug, {
		lower: true,
		strict: true,
		trim: true,
	});
}
