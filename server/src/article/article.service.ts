import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticleService {
	create(createArticleDto: CreateArticleDto) {
		console.log(createArticleDto);
		return "This action adds a new article";
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
