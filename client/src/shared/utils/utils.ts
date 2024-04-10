import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

interface Options {
	includeLongDate?: boolean;
}

export function getElapsedTime(
	date: Date | string,
	{ includeLongDate = false }: Options = {}
): string {
	if (typeof date === "string") {
		date = new Date(date);
	}

	const currentDate = new Date();
	const diffMs = currentDate.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMinutes < 60) {
		return `${diffMinutes}m`;
	} else if (diffHours < 24) {
		return `${diffHours}h`;
	} else {
		if (includeLongDate) {
			return formatDate(date);
		}

		return `${diffDays}d`;
	}
}

export function getUsernameColor(username?: string | null): string {
	if (!username) return "#D1D5DB";

	let hash = 0;
	for (let i = 0; i < username.length; i++) {
		hash = username.charCodeAt(i) + ((hash << 5) - hash);
	}

	// Convert the hash to a hexadecimal color
	let color = "#";
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		const lightValue = Math.min(230, value + 90); // Ensure color is lighter
		color += ("00" + lightValue.toString(16)).slice(-2);
	}

	return color;
}
