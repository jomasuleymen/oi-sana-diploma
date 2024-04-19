import { Card } from "@components/ui/card";
import { cn, formatDate } from "@utils/utils";
import { MessageCircleMore, SettingsIcon } from "lucide-react";

import AvatarWrapper from "@components/ui/avatar-wrapper";
import { checkMessagePermission, Specialist } from "@pages/specialist/specialist.service";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
	specialist: Specialist;
	setActiveTab: (tab: string) => void;
	activeTab: string;
	ownPage: boolean;
};

type MessagePermissionData = {
	loading: boolean;
	allowed: boolean;
};

const ProfileHeader: React.FC<Props> = ({ specialist, setActiveTab, activeTab, ownPage }) => {
	const user = specialist.user;
	const createdAt = new Date(user.createdAt);

	const [messagePermission, setMessagePermission] = React.useState<MessagePermissionData>({
		loading: true,
		allowed: false,
	});

	useEffect(() => {
		checkMessagePermission(user.id)
			.then((res) => {
				setMessagePermission({ loading: false, allowed: res });
			})
			.catch(() => {
				setMessagePermission({ loading: false, allowed: false });
			});
	}, [specialist]);

	return (
		<div className="flex flex-col gap-2 relative">
			<div className="avatar">
				<Card className="media w-28 h-28 bg-neutral-200 border-slate-300 overflow-hidden">
					<AvatarWrapper
						src={user.profileImage}
						username={user.username}
						className="w-full h-full text-4xl"
						rounded={false}
					/>
				</Card>
			</div>
			<div className="mb-1">
				<div className="title text-2xl font-bold">
					{user.firstname} {user.lastname}
				</div>
				<div className="text-sm text-gray-600">@{user.username}</div>
			</div>
			<div className="actions flex gap-2 absolute right-0 top-0">
				<Link to="/settings">
					{ownPage && (
						<Card className="shadow-sm p-2">
							<SettingsIcon />
						</Card>
					)}
				</Link>
				{!ownPage && messagePermission.allowed && (
					<Link to={{ pathname: "/chat", search: `?user=${user.id}` }}>
						<Card className="shadow-sm p-2 flex items-center font-semibold gap-1 bg-primary text-white cursor-pointer">
							<MessageCircleMore />
							Message
						</Card>
					</Link>
				)}
			</div>
			<div className="details text-base font-regular text-gray-700 mb-6 leading-5">
				{specialist.about}
			</div>
			<div className="stats font-semibold text-sm">
				Toptal member since {formatDate(createdAt)}
			</div>
			<div className="tabs flex gap-2 h-14 items-center">
				<div
					onClick={() => setActiveTab("articles")}
					className={cn(
						"flex items-center justify-center h-full cursor-pointer",
						activeTab === "articles" && "border-b-4 border-primary"
					)}
				>
					Articles
				</div>
				<div
					onClick={() => setActiveTab("courses")}
					className={cn(
						"flex items-center justify-center h-full cursor-pointer",
						activeTab === "courses" && "border-b-4 border-primary"
					)}
				>
					Courses
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
