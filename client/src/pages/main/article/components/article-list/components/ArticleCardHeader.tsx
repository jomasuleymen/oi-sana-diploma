import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Badge } from "@components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Article } from "@pages/main/article/article.service";
import { getElapsedTime } from "@utils/utils";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
	post: Article;
};

const ArticleCardHeader: React.FC<Props> = ({ post }) => {
	const user = post.author.user;

	return (
		<CardHeader className="p-4">
			<div className="flex items-center gap-4">
				<Link to={`/specialists/${user.id}`}>
					<div className="flex items-center gap-1 just">
						<AvatarWrapper
							username={user.username}
							src={user.profileImage}
							className="w-8 h-8"
						/>
						<div className="text-base">{user.username}</div>
					</div>
				</Link>
				<div className="text-sm align-middle text-gray-500">
					<span className="align-middle">
						{getElapsedTime(post.createdAt, { includeLongDate: true })}
					</span>
				</div>
			</div>
		</CardHeader>
	);
};

export default ArticleCardHeader;
