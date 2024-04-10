import Typography from "@components/ui/typography";
import { NewsArticle } from "@pages/main/home/services/news.service";
import { formatDate } from "@utils/utils";

interface NewsHeaderProps {
	newsArticle: NewsArticle;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({
	newsArticle: { title, description, createdAt },
}) => (
	<div className="mx-auto max-w-[800px]">
		<Typography className="text-5xl font-bold mb-3">{title}</Typography>
		{description && (
			<p className="text-xl text-gray-500">
				<div dangerouslySetInnerHTML={{ __html: description }} />
			</p>
		)}
		<p className="text-base text-gray-500 mt-1">{formatDate(createdAt)}</p>
	</div>
);

export default NewsHeader;
