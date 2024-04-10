import { cn, getUsernameColor } from "@utils/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function getInitials(name?: string | null): string {
	if (!name) return "US";

	let initials: any = name.split(" ");

	if (initials.length > 1) {
		initials = initials.shift().charAt(0) + initials.pop().charAt(0);
	} else {
		initials = name.substring(0, 2);
	}

	return initials.toUpperCase();
}

type Props = {
	src?: string | null;
	username?: string | null;
	className?: string;
	rounded?: boolean;
};

const AvatarWrapper: React.FC<Props> = ({ src, username, className, rounded = true }) => {
	return (
		<Avatar className={cn("h-10 w-10", !rounded && "rounded-none", className)}>
			<AvatarImage
				src={src ? import.meta.env.VITE_SERVER_URL + "/uploads/" + src : ""}
				alt="avatar"
			/>
			<AvatarFallback
				style={{ backgroundColor: getUsernameColor(username) }}
				className={cn(!rounded && "rounded-none")}
			>
				{getInitials(username)}
			</AvatarFallback>
		</Avatar>
	);
};

export default AvatarWrapper;
