import { Card } from "@components/ui/card";
import { User, getUser } from "@pages/main/profile/user.service";
import { useAuthStore } from "@/store/auth.store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileArticles from "./components/articles";
import MiniEditor from "./components/mini-editor";
import ProfileHeader from "./components/profile-header";

// const tabs = [
// 	{
// 		name: "Articles",
// 		path: "articles",
// 	},
// 	{
// 		name: "Courses",
// 		path: "courses",
// 	},
// ];

const ProfilePage: React.FC = () => {
	const me = useAuthStore((store) => store.user);
	const { userId } = useParams<{ userId: string }>();
	const [user, setUser] = React.useState<User | null>(null);
	const isMyProfile = me?.id == userId;

	useEffect(() => {
		if (userId) {
			getUser(userId).then((user) => {
				setUser(user);
			});
		}
	}, [userId]);

	if (!user) return null;

	return (
		<div className="w-[960px] mx-auto h-full">
			<div className="grid grid-cols-[1fr_300px] gap-[32px_20px]">
				<Card className="page-header col-span-2 p-3 pb-0">
					<ProfileHeader user={user} />
				</Card>
				<Card className="page-content col-span-1 space-y-5">
					{isMyProfile && <MiniEditor user={user} />}
					<ProfileArticles user={user} />
				</Card>
				<Card className="page-sidebar col-span-1 space-y-5">
					<Card>1</Card>
					<Card>2</Card>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
