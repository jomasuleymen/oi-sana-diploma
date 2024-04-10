import ServerImage from "@components/ui/image";
import { NewsArticle } from "@pages/main/home/services/news.service";
import React from "react";
import ReactQuill from "react-quill";

interface NewsContentProps {
	newsArticle: NewsArticle;
}

const NewsContent: React.FC<NewsContentProps> = ({ newsArticle: { content, image } }) => {
	return (
		<div className="mt-10 pb-10">
			{image && (
				<ServerImage className="object-cover mx-auto mb-6" src={image} alt="News image" />
			)}
			<ReactQuill
				value={content}
				readOnly={true}
				theme="snow"
				className="max-w-[800px] mx-auto"
				modules={{
					toolbar: false,
				}}
			/>
		</div>
	);
};

export default NewsContent;
