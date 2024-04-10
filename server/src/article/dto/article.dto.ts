import { Specialist } from "src/specialist/entities/specialist.entity";
import { Article } from "../entities/article.entity";

export class ArticleDTO implements Partial<Article> {
	id: string;
	title: string;
	content: string;
	coverImage: string;
	slug?: string;
	createdAt?: Date;
	author: Specialist;

	static fromEntity(entity: Article) {
		const dto = new ArticleDTO();
		dto.id = entity.id;
		dto.title = entity.title;
		dto.content = entity.content;
		dto.coverImage = entity.coverImage;
		dto.slug = entity.slug;
		dto.createdAt = entity.createdAt;
		dto.author = entity.author;

		return dto;
	}
}
