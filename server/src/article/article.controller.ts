import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { USER_ROLE } from "src/user/user-roles";
import { UserSession } from "src/auth/dto/session-user.dto";
import UseSession from "src/auth/decorators/use-session.decorator";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";
import {
	Sorting,
	SortingParams,
} from "src/decorators/sorting-params.decorator";
import {
	Filtering,
	FilteringParams,
} from "src/decorators/filtering-params.decorator";
import { ArticleEntity } from "./entities/article.entity";

@Controller("articles")
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@Post()
	@UseAuthorized(USER_ROLE.SPECIAL, USER_ROLE.ADMIN)
	async create(
		@Body() createArticleDto: CreateArticleDto,
		@UseSession() user: UserSession,
	) {
		return await this.articleService.create(user.id, createArticleDto);
	}

	@Get()
	async find(
		@PaginationParams() pagination: Pagination,
		@SortingParams<ArticleEntity>(["title", "createdAt"]) sort?: Sorting[],
		@FilteringParams<ArticleEntity>(["title", "author"]) filter?: Filtering[],
	) {
		return await this.articleService.findBy(pagination, sort, filter);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.articleService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articleService.update(+id, updateArticleDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.articleService.remove(+id);
	}
}
