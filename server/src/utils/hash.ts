import crypto from "crypto";

export function generateRandomHash(length: number) {
	const bytes = Math.ceil(length / 2);
	return crypto.randomBytes(bytes).toString("hex").slice(0, length);
}
