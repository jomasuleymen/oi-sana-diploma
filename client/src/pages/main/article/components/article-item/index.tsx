import AvatarWrapper from "@components/ui/avatar-wrapper";
import { buttonVariants } from "@components/ui/button";
import Container from "@components/ui/container";
import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import { cn, formatDate } from "@utils/utils";
import { ChevronLeft } from "lucide-react";
import React from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../../hooks/use-article";
import EmptyDataPage from "@components/empty-data";
import Loading from "@components/loading";

const ArticlePage: React.FC = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	if (!slug) {
		return null;
	}

	const { isLoading, item } = useArticle(slug);

	if (isLoading) {
		return <Loading />;
	}

	if (!item) {
		return (
			<Container>
				<EmptyDataPage />
			</Container>
		);
	}

	const { author } = item;

	const user = author.user;

	return (
		<Container transparent className="relative py-4 max-w-[800px] mx-auto">
			<Link
				to="/articles"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-[-200px] top-1 hidden xl:inline-flex"
				)}
			>
				<ChevronLeft className="mr-2 h-4 w-4" />
				See all posts
			</Link>
			<div>
				<time dateTime={item.createdAt} className="block text-sm text-muted-foreground">
					Published on {formatDate(item.createdAt)}
				</time>
				<Typography
					variant="h2"
					className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl"
				>
					{item.title}
				</Typography>
				<div className="mt-4 flex space-x-4">
					<div
						key={user.id}
						className="flex items-center space-x-2 text-sm cursor-pointer"
						onClick={() => navigate(`/specialists/${author.userId}`)}
					>
						<AvatarWrapper src={user.profileImage} username={user.username} />
						<div className="flex-1 text-left leading-tight ">
							<p className="font-medium">{user.firstname}</p>
							<p className="text-muted-foreground">@{user.username}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-10 pb-10">
				{item.coverImage && (
					<ServerImage
						className="object-cover mx-auto mb-6"
						src={item.coverImage}
						alt="News image"
					/>
				)}
				<ReactQuill
					value={item.content}
					readOnly={true}
					theme="snow"
					className="max-w-[800px] mx-auto"
					modules={{
						toolbar: false,
					}}
				/>
			</div>
		</Container>
	);
};

export default ArticlePage;
