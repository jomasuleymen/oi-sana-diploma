import {
	IsNotEmpty,
	IsString,
	IsUrl,
	MaxLength,
	MinLength,
} from "class-validator";
import { ArticleEntity } from "../entities/article.entity";

export class CreateArticleDto implements Partial<ArticleEntity> {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(60)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(3000)
	content: string;

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	coverImage: string;
}
