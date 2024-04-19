import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
import {
	Filtering,
	FilteringParams,
} from "src/decorators/filtering-params.decorator";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";
import {
	Sorting,
	SortingParams,
} from "src/decorators/sorting-params.decorator";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";
import { ROLE } from "src/user/user-enums";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@Controller("articles")
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@Post()
	@UseAuthorized(ROLE.SPECIAL, ROLE.ADMIN)
	async create(
		@Body() createArticleDto: CreateArticleDto,
		@UseSession() user: UserSession,
	) {
		return await this.articleService.create(+user.id, createArticleDto);
	}

	@Get()
	async find(
		@PaginationParams() pagination: Pagination,
		@SortingParams<Article>(["title", "createdAt"]) sort?: Sorting[],
		@FilteringParams<Article>(["title", "author"]) filter?: Filtering[],
	) {
		return await this.articleService.findBy(pagination, sort, filter);
	}

	@Get(":slug")
	findOne(@Param("slug") slug: string) {
		return this.articleService.findOneBySlug(slug);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articleService.update(+id, updateArticleDto);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.articleService.deleteManyById(dto.id as any);

		return { message: "Articles deleted successfully" };
	}

	@UseAuthorized(ROLE.ADMIN, ROLE.SPECIAL)
	@Delete(":id")
	async deleteOne(@Param("id") id: string, @UseSession() user: UserSession) {
		await this.articleService.deleteById(id, user.id);

		return { message: "Article deleted successfully" };
	}
}
