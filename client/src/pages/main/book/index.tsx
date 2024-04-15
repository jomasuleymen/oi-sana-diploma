import React from "react";

import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";
import Container from "@components/ui/container";
import Book from "./components/book";
import { useBooks } from "./hooks/use-books";

type Props = {};

const BooksPage: React.FC<Props> = ({}) => {
	const { items, isLoading } = useBooks();

	if (isLoading) {
		return <Loading />;
	}

	if (!items.length) {
		return (
			<Container>
				<NoDataFound />
			</Container>
		);
	}

	return (
		<Container className="py-4">
			<div className="flex flex-wrap justify-center gap-4">
				{items.map((item) => (
					<Book item={item} key={item.id} />
				))}
			</div>
		</Container>
	);
};

export default BooksPage;
