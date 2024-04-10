import {
	IsNotEmpty,
	IsString,
	IsUrl,
	MaxLength,
	MinLength,
} from "class-validator";
import { Article } from "../entities/article.entity";

export class CreateArticleDto implements Partial<Article> {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(255)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(15000)
	content: string;

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	coverImage: string;
}
