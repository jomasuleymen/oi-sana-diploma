import AvatarWrapper from "@components/ui/avatar-wrapper";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/utils";
import { Info, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "@pages/main/user/user.service";

interface ChatTopbarProps {
	selectedUser: Pick<User, "id" | "username" | "profileImage">;
}

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
	return (
		<div className="w-full h-20 flex p-4 justify-between items-center border-b">
			<div className="flex items-center gap-2">
				<AvatarWrapper
					className="flex justify-center items-center"
					src={selectedUser.profileImage}
					username={selectedUser.username}
				/>
				<div className="flex flex-col">
					<span className="font-medium">{selectedUser.username}</span>
				</div>
			</div>
		</div>
	);
}
