import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { PaginatedResource, getOrder, getWhere } from "src/lib/typeorm.util";
import { SpecialistService } from "src/specialist/specialist.service";
import { Equal, Repository } from "typeorm";
import { ArticleDTO } from "./dto/article.dto";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";
import { ROLE } from "src/user/user-enums";

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article)
		private articleRepository: Repository<Article>,
		private readonly spevService: SpecialistService,
	) {}

	async create(userId: number, dto: CreateArticleDto) {
		const specialist = await this.spevService.findOne(userId);
		if (!specialist) {
			throw new BadRequestException("Specialist not found");
		}

		const exists = await this.articleRepository.exists({
			where: { title: Equal(dto.title), author: specialist },
		});

		if (exists) {
			throw new BadRequestException("Article with this title already exists");
		}

		const article = this.articleRepository.create(dto);

		article.author = specialist;
		article.slug = slugify(dto.title, { lower: true, trim: true });

		await this.articleRepository.save(article);

		return article;
	}

	async findByUserId() {}

	async findBy(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	): Promise<PaginatedResource<ArticleDTO>> {
		const where = getWhere<Article>(filter);
		const order = getOrder(sort);

		if (where.author) {
			where.author = {
				userId: where.author as number,
			};
		}

		const [articles, count] = await this.articleRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: {
				author: { user: true },
			},
		});

		const articlesDto: Array<ArticleDTO> = [];

		for (const article of articles) {
			articlesDto.push(ArticleDTO.fromEntity(article));
		}

		return {
			totalItems: count,
			items: articlesDto,
			pageCount: Math.ceil(count / size),
		};
	}

	findAll() {
		return `This action returns all article`;
	}

	findOneBySlug(slug: string) {
		return this.articleRepository.findOne({
			where: { slug },
			relations: {
				author: {
					user: true,
				},
			},
		});
	}

	update(id: number, updateArticleDto: UpdateArticleDto) {
		updateArticleDto;
		return `This action updates a #${id} article`;
	}

	async deleteById(id: Article["id"], userId: number) {
		if (!userId) {
			throw new BadRequestException("User not found");
		}

		const article = await this.articleRepository.findOne({
			where: { id },
			relations: ["author"],
		});

		if (!article) {
			throw new BadRequestException("Article not found");
		}

		if (
			article.author.userId !== userId &&
			article.author.user.role !== ROLE.ADMIN
		) {
			throw new BadRequestException("You can't delete this article");
		}

		return await this.articleRepository.delete({ id: Equal(id) });
	}

	async deleteManyById(ids: Article["id"][]) {
		return await this.articleRepository.delete(ids);
	}
}
