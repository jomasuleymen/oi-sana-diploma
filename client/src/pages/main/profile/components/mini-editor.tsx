import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Badge } from "@components/ui/badge";
import { Card } from "@components/ui/card";
import { User } from "@pages/main/profile/user.service";
import { Link1Icon } from "@radix-ui/react-icons";
import React from "react";
import { FaPhotoFilm } from "react-icons/fa6";

type Props = {
	user: User;
};

const MiniEditor: React.FC<Props> = ({ user }) => {
	return (
		<Card className="px-5 py-3 space-y-2">
			<div className="top flex gap-2 items-center">
				<AvatarWrapper
					className="h-7 w-7 cursor-default select-none"
					src={user?.profileImage}
					username={user?.username}
				/>
				<div className="text-stone-500">Новая запись</div>
			</div>
			<div className="bottom flex gap-2">
				<Badge className="flex gap-2 py-1 text-sm">
					<FaPhotoFilm /> <span>Photo and Video</span>
				</Badge>
				<Badge className="flex gap-2 py-1 text-sm">
					<Link1Icon /> <span>Link</span>
				</Badge>
			</div>
		</Card>
	);
};

export default MiniEditor;
