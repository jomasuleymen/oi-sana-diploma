import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { PaginatedResource } from "src/lib/typeorm.util";
import { Equal, Repository } from "typeorm";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { News } from "./entities/news.entity";
import { slugifyText } from "src/utils/slug";

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private newsRepo: Repository<News>,
	) {}

	async create(createNewsDto: CreateNewsDto) {
		const news = this.newsRepo.create(createNewsDto);
		news.slug = slugifyText(createNewsDto.title);

		if (!news.description) {
			news.description = createNewsDto.content.slice(0, 100);
		}

		return await this.newsRepo.save(news);
	}

	async findAll() {
		return await this.newsRepo.find();
	}

	async findBy({
		size,
		limit,
		offset,
	}: Pagination): Promise<PaginatedResource<News>> {
		const [items, count] = await this.newsRepo.findAndCount({
			take: limit,
			skip: offset,
		});

		return {
			totalItems: count,
			items,
			pageCount: Math.ceil(count / size),
		};
	}

	async findOne(id: number) {
		return await this.newsRepo.findOneBy({ id });
	}

	async findOneBySlug(slug: string) {
		return await this.newsRepo.findOneBy({ slug });
	}

	async update(id: number, updateNewsDto: UpdateNewsDto) {
		return await this.newsRepo.update(id, updateNewsDto);
	}

	async deleteById(id: News["id"]) {
		return await this.newsRepo.delete({ id: Equal(id) });
	}
	async deleteManyById(ids: News["id"][]) {
		return await this.newsRepo.delete(ids);
	}
}
