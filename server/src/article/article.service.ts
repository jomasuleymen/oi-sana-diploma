import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { PaginatedResource, getOrder, getWhere } from "src/lib/typeorm.util";
import { UserService } from "src/user/user.service";
import { Equal, Repository } from "typeorm";
import { ArticleDTO } from "./dto/article.dto";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleEntity } from "./entities/article.entity";

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(ArticleEntity)
		private articleRepository: Repository<ArticleEntity>,
		private readonly userService: UserService,
	) {}

	async create(userId: string, dto: CreateArticleDto) {
		const user = await this.userService.findById(userId);
		if (!user) {
			throw new BadRequestException("User not found");
		}

		const exists = await this.articleRepository.exists({
			where: { title: Equal(dto.title), author: user },
		});

		if (exists) {
			throw new BadRequestException("Article with this title already exists");
		}

		const articleEntity = this.articleRepository.create(dto);

		articleEntity.author = user;
		articleEntity.slug = slugify(dto.title, { lower: true, trim: true });

		await this.articleRepository.save(articleEntity);

		return articleEntity;
	}

	async findByUserId() {}

	async findBy(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	): Promise<PaginatedResource<ArticleDTO>> {
		const where = getWhere<ArticleEntity>(filter);
		const order = getOrder(sort);

		if (where.author) {
			where.author = {
				id: where.author as string,
			};
		}

		const [articles, count] = await this.articleRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: {
				author: true,
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

	findOne(id: number) {
		return `This action returns a #${id} article`;
	}

	update(id: number, updateArticleDto: UpdateArticleDto) {
		console.log(updateArticleDto);
		return `This action updates a #${id} article`;
	}

	remove(id: number) {
		return `This action removes a #${id} article`;
	}
}
