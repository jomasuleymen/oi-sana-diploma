import UserDTO from "src/user/dto/user.dto";
import { ArticleEntity } from "../entities/article.entity";

export class ArticleDTO implements Partial<ArticleEntity> {
	id: string;
	title: string;
	content: string;
	coverImage: string;
	slug?: string;
	createdAt?: Date;
	user: Partial<UserDTO>;

	static fromEntity(entity: ArticleEntity) {
		const dto = new ArticleDTO();
		dto.id = entity.id;
		dto.title = entity.title;
		dto.content = entity.content;
		dto.coverImage = entity.coverImage;
		dto.slug = entity.slug;
		dto.createdAt = entity.createdAt;

		if (entity.author) {
			dto.user = {
				profileImage: entity.author.profileImage,
				username: entity.author.username,
				id: entity.author.id,
			};
		}

		return dto;
	}
}
