import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import React from "react";
import { Link } from "react-router-dom";
import { useNews } from "../../hooks/use-news";
import Loading from "@components/loading";
import NoDataFound from "@components/empty-data";

type Props = {};

const News: React.FC<Props> = ({}) => {
	const { items: news, nextPage, isLoading } = useNews();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="w-full max-w-4xl">
			<Typography variant="h1" className="text-[#6B6B6B]">
				Latest News
			</Typography>
			<div className="flex flex-col gap-6">
				{news.length === 0 ? (
					<NoDataFound className="mt-10" />
				) : (
					news.map((article) => (
						<Link to={`/news/${article.slug}`} key={article.id}>
							<div className="flex items-center justify-between w-full gap-6">
								<div className="flex flex-col gap-1 flex-1">
									<Typography variant="h4" className="font-bold">
										{article.title}
									</Typography>
									<Typography
										variant="h3"
										className="line-clamp-2 text-base max-h-10 leading-5 overflow-ellipsis text-[#6B6B6B] overflow-hidden font-normal"
									>
										<div
											dangerouslySetInnerHTML={{
												__html: article.description || article.content,
											}}
										/>
									</Typography>
									<div>
										<span className="text-[#6B6B6B] text-[13px] font-normal pt-2">
											{new Date(article.createdAt).toLocaleDateString(
												"ru-RU",
												{
													month: "long",
													day: "numeric",
													year: "numeric",
												}
											)}
										</span>
									</div>
								</div>
								<div className="p-0 m-0 w-[200px] h-[134px]">
									<ServerImage
										src={article.image}
										className="w-full h-full object-fill"
										width={200}
										height={134}
									/>
								</div>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default News;
