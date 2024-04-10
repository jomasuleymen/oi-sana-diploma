import React from "react";
import ArticlesListPage from "./components/article-list";
import Container from "@components/ui/container";

type Props = {};

const ArticlesPage: React.FC<Props> = ({}) => {
	return (
		<Container transparent>
			<ArticlesListPage />
		</Container>
	);
};

export default ArticlesPage;
