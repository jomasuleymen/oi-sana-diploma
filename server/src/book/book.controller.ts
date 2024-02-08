import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
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
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookEntity } from "./entities/book.entity";

@Controller("books")
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Post()
	async create(@Body() createBookDto: CreateBookDto) {
		return await this.bookService.create(createBookDto);
	}

	@Get()
	async findAll(
		@PaginationParams() pagination: Pagination,
		@SortingParams<BookEntity>(["title"]) sort?: Sorting[],
		@FilteringParams<BookEntity>(["title", "author"]) filter?: Filtering[],
	) {
		return await this.bookService.findAll(pagination, sort, filter);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.bookService.findOne(+id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
		return await this.bookService.update(+id, updateBookDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.bookService.remove(+id);
	}
}
