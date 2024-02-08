import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { useArticles } from "@pages/main/article/hooks/use-articles";
import { User } from "@pages/main/profile/user.service";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	user: User;
};

const NoArticles: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h3>Write your first article to attract readers to your blog</h3>
			<Button variant="outline" onClick={() => navigate("/articles/writing")}>
				Write an article
			</Button>
		</div>
	);
};

const ProfileArticles: React.FC<Props> = ({ user }) => {
	const { articles, isLoading, nextPage } = useArticles(user.id);

	if (isLoading) return null;

	if (!articles.length) return <NoArticles />;

	return (
		<Card className="px-5 py-3">
			{articles.map((article) => {
				const date = new Date(article.createdAt);
				/**
				 * 21.12.2023 or 4 jan or yesterday or 2 hours ago
				 */
				let dateFromNow = "";
				const now = new Date();
				const diff = now.getTime() - date.getTime();
				const hours = diff / (1000 * 60 * 60);
				const days = hours / 24;
				const months = days / 30;

				if (now.getFullYear() != date.getFullYear()) {
					dateFromNow = date.toLocaleDateString("ru-RU");
				} else if (days < 1) {
					dateFromNow = `${Math.round(hours)} hours ago`;
				} else if (days < 2) {
					dateFromNow = "yesterday";
				} else if (months < 1) {
					dateFromNow = date.toLocaleString("en-US", { day: "numeric", month: "short" });
				}
				return (
					<Card>
						<div className="header flex gap-3">
							<div className="author flex gap-1">
								<AvatarWrapper
									className="h-7 w-7 cursor-default select-none"
									src={user.profileImage}
									username={user.username}
								/>
								<span className="font-bold">{user.username}</span>
							</div>
							<div className="date">{dateFromNow}</div>
						</div>
						<div className="title">{article.title}</div>
						<div
							className="mini-desc line-clamp-2 break-words"
							dangerouslySetInnerHTML={{ __html: article.content }}
						></div>
					</Card>
				);
			})}
		</Card>
	);
};

export default ProfileArticles;
