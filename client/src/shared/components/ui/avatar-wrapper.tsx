import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@utils/tailwind.utils";
import { UserRound } from "lucide-react";

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
};

const AvatarWrapper: React.FC<Props> = ({ src, username, className }) => {
	return (
		<Avatar className={cn("h-10 w-10", className)}>
			<AvatarImage src={src || ""} alt="avatar" />
			<AvatarFallback>{getInitials(username)}</AvatarFallback>
		</Avatar>
	);
};

export default AvatarWrapper;
