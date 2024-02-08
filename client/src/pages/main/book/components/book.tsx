import ServerImage from "@components/ui/image";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Book as BookType } from "../book.service";

type Props = {
	item: BookType;
};

const Book: React.FC<Props> = ({ item }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="w-96 h-96 border bg-slate-200 cursor-pointer" onClick={handleClick}>
				<ServerImage src={item.image} className="w-full h-full" alt="book-cover" />
			</div>

			<div className="w-96 h-96 border bg-yellow-200 cursor-pointer" onClick={handleClick}>
				{item.details}
			</div>
		</ReactCardFlip>
	);
};

export default Book;
