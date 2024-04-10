import Container from "@components/ui/container";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsArticle } from "./hooks/user-news-article";
import NewsHeader from "./components/NewsHeader";
import NewsContent from "./components/NewsContent";
import EmptyDataPage from "@components/empty-data";
import Loading from "@components/loading";

type Props = {};

const NewsPage: React.FC<Props> = ({}) => {
	const { slug } = useParams();
	const navigate = useNavigate();

	if (!slug) {
		navigate("/home");
		return;
	}

	const { isLoading, item } = useNewsArticle(slug);

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

	return (
		<Container transparent className="pt-8">
			<NewsHeader newsArticle={item} />
			<NewsContent newsArticle={item} />
		</Container>
	);
};

export default NewsPage;
