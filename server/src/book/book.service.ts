import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./entities/book.entity";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";

@Injectable()
export class BookService {
	constructor(
		@InjectRepository(BookEntity)
		private bookRepository: Repository<BookEntity>,
	) {}

	async create(createBookDto: CreateBookDto) {
		return await this.bookRepository.save(createBookDto);
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<BookEntity>(filter);
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

	async findOne(id: number) {
		return await this.bookRepository.findOneBy({ id });
	}

	async update(id: number, updateBookDto: UpdateBookDto) {
		return await this.bookRepository.update({ id }, updateBookDto);
	}

	async remove(id: number) {
		return await this.bookRepository.delete({ id });
	}
}
