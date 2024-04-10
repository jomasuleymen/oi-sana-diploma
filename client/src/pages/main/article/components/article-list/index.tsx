import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import Typography from "@components/ui/typography";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../../article.service";
import { useArticles } from "../../hooks/use-articles";
import ArticleCardHeader from "./components/ArticleCardHeader";
import ServerImage from "@components/ui/image";
import ArticleOptions from "@pages/specialist/profile/components/profile-articles/options";
import EmptyDataPage from "@components/empty-data";
import Container from "@components/ui/container";
import Loading from "@components/loading";

type Props = {
	specId?: number;
	withOptions?: boolean;
};

const ArticlesListPage: React.FC<Props> = ({ specId, withOptions }) => {
	const { articles, isLoading } = useArticles(specId);

	if (isLoading) {
		return <Loading />;
	}

	if (!articles.length) {
		return (
			<Container>
				<EmptyDataPage />
			</Container>
		);
	}

	return (
		<div className="space-y-4">
			{articles.map((post: Article, index: number) => (
				<Card
					className="col-span-1 p-0 max-w-[640px] w-[640px] mx-auto relative"
					key={index}
				>
					<ArticleCardHeader post={post} />
					<Link to={`/articles/${post.slug}`}>
						<div className="w-full">
							<ServerImage
								src={post.coverImage}
								alt={post.title}
								className="w-full max-h-96 object-cover"
							/>
						</div>
						<CardContent className="px-4 py-2">
							<CardTitle className="text-[22px]">{post.title}</CardTitle>
							<CardDescription className="text-[16px] text-black">
								<div
									className="line-clamp-2"
									dangerouslySetInnerHTML={{ __html: post.content }}
								/>
							</CardDescription>
						</CardContent>
					</Link>
					{withOptions && <ArticleOptions article={post} />}
				</Card>
			))}
		</div>
	);
};

export default ArticlesListPage;
