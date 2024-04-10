import React from "react";

import Container from "@components/ui/container";
import Book from "./components/book";
import { useBooks } from "./hooks/use-books";
import Loading from "@components/loading";
import EmptyDataPage from "@components/empty-data";

type Props = {};

const BooksPage: React.FC<Props> = ({}) => {
	const { items, isLoading } = useBooks();

	if (isLoading) {
		return <Loading />;
	}

	if (!items.length) {
		return (
			<Container>
				<EmptyDataPage />
			</Container>
		);
	}

	return (
		<Container className="py-4">
			<div className="gap-2 flex flex-wrap justify-center">
				{items.map((item) => (
					<Book item={item} key={item.id} />
				))}
			</div>
		</Container>
	);
};

export default BooksPage;
