import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";

@Injectable()
export class BookService {
	constructor(
		@InjectRepository(Book)
		private bookRepository: Repository<Book>,
	) {}

	async create(createBookDto: CreateBookDto) {
		return await this.bookRepository.save(createBookDto);
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<Book>(filter);
		const order = getOrder(sort);

		const [books, count] = await this.bookRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
		});

		return {
			totalItems: count,
			items: books,
			pageCount: Math.ceil(count / size),
		};
	}

	async findById(id: number | number) {
		return await this.bookRepository.findOneBy({ id });
	}

	async update(id: number, updateBookDto: UpdateBookDto) {
		return await this.bookRepository.update({ id }, updateBookDto);
	}

	async deleteById(id: Book["id"]) {
		return await this.bookRepository.delete({ id: Equal(id) });
	}

	async deleteManyById(ids: Book["id"][]) {
		return await this.bookRepository.delete(ids);
	}
}
