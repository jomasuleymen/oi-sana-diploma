import React from "react";

import { Card } from "@/shared/components/ui/card";
import Book from "./components/book";
import { useBooks } from "./hooks/use-books";

type Props = {};

const BooksPage: React.FC<Props> = ({}) => {
	const { items } = useBooks();

	return (
		<Card className="flex">
			{items.map((item) => (
				<Book item={item} key={item.id} />
			))}
		</Card>
	);
};

export default BooksPage;
