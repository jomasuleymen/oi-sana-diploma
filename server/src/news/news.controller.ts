import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { ROLE } from "src/user/user-enums";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";
import {
	Pagination,
	PaginationParams,
} from "src/decorators/pagination-params.decorator";

@Controller("news")
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Post()
	@UseAuthorized(ROLE.ADMIN)
	async create(@Body() createNewsDto: CreateNewsDto) {
		return await this.newsService.create(createNewsDto);
	}

	@Get()
	async findBy(@PaginationParams() pagination: Pagination) {
		return await this.newsService.findBy(pagination);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateNewsDto: UpdateNewsDto) {
		return await this.newsService.update(+id, updateNewsDto);
	}

	@Get(":slug")
	async findOne(@Param("slug") slug: string) {
		return await this.newsService.findOneBySlug(slug);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.newsService.deleteManyById(dto.id as any);

		return { message: "Articles deleted" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.newsService.deleteById(+id);

		return { message: "Article deleted" };
	}
}
