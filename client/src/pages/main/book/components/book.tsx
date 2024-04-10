import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import { LinkIcon } from "lucide-react";
import React from "react";
import { Book as BookType } from "../book.service";
import { Link } from "react-router-dom";

type Props = {
	item: BookType;
};

const Book: React.FC<Props> = ({ item }) => {
	return (
		<Card className="w-full py-3 overflow-hidden flex max-w-3xl relative">
			<div className="flex items-center justify-center min-h-60 max-h-60 min-w-48 max-w-48 my-auto mx-2">
				<ServerImage
					src={item.image}
					alt="Profile image"
					className="w-full h-full object-fill"
				/>
			</div>
			<div className="p-2">
				<div className="text-2xl font-bold text-center mb-2">{item.title}</div>
				<div className="text-sm mb-1">{item.details}</div>
				<div className="text-sm text-gray-500 text-end font-bold">{item.author}</div>
			</div>
			<Link to={item.link} target="_blank">
				<div className="absolute top-2 right-2">
					<LinkIcon size={20} />
				</div>
			</Link>
		</Card>
	);
};

export default Book;
