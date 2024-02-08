import { Card } from "@components/ui/card";
import { cn } from "@utils/tailwind.utils";
import { User } from "@pages/main/profile/user.service";
import { MessageSquareMoreIcon, SettingsIcon } from "lucide-react";

import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
	user: User;
};

const ProfileHeader: React.FC<Props> = ({ user }) => {
	const createdAt = new Date(user.createdAt);
	const { pathname } = useLocation();

	return (
		<div className="flex flex-col gap-2 relative">
			<div className="avatar">
				<Card className="media w-28 h-28 bg-neutral-200 border-slate-300 overflow-hidden">
					{user.profileImage && (
						<img src={user.profileImage} alt="avatar" className="w-full h-full" />
					)}
				</Card>
			</div>
			<div className="title text-4xl font-bold">{user.username}</div>
			{/* <div className="description">Изменить описание</div> */}
			<div className="actions flex gap-2 absolute right-0 top-0">
				<Card className="shadow-sm p-2">
					<SettingsIcon />
				</Card>
				<Card className="shadow-sm px-4 py-2 w-max flex gap-2 bg-primary text-white">
					<MessageSquareMoreIcon /> Write
				</Card>
			</div>
			<div className="stats">
				На проекте с{" "}
				{createdAt.toLocaleDateString("ru-Ru", {
					month: "short",
					year: "numeric",
					day: "numeric",
				})}
			</div>
			<div className="tabs flex gap-2 h-14 items-center">
				<Link
					to="articles"
					className={cn(
						"flex items-center justify-center h-full ",
						pathname === "/profile/1" && "border-b-4 border-primary"
					)}
				>
					Articles
				</Link>
				<Link
					to="articles"
					className={cn(
						"flex items-center justify-center h-full ",
						pathname === "/profile/comments" && "border-b-4 border-primary"
					)}
				>
					Comments
				</Link>
			</div>
		</div>
	);
};

export default ProfileHeader;
