import { cn, getUsernameColor, isURL } from "@utils/utils";
import React, { memo } from "react";
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
	if (src) {
		src = isURL(src) ? src : `${import.meta.env.VITE_SERVER_URL}/uploads/${src}`;
	}

	return (
		<Avatar className={cn("h-10 w-10", !rounded && "rounded-none", className)}>
			<AvatarImage src={src || ""} alt="avatar" className="object-cover" />
			<AvatarFallback
				style={{ backgroundColor: getUsernameColor(username) }}
				className={cn(!rounded && "rounded-none")}
			>
				{getInitials(username)}
			</AvatarFallback>
		</Avatar>
	);
};

export default memo(AvatarWrapper);
