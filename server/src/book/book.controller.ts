import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
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
import { UserDeleteDTO } from "src/user/dto/user-delete.dto";
import { USER_ROLE } from "src/user/user-roles";
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
		return await this.bookService.findById(+id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
		return await this.bookService.update(+id, updateBookDto);
	}

	@UseAuthorized(USER_ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: UserDeleteDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.bookService.deleteManyById(dto.id as any);

		return { message: "Пользователь успешно удален" };
	}

	@UseAuthorized(USER_ROLE.ADMIN)
	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.bookService.deleteById(+id);

		return { message: "Пользователь успешно удален" };
	}
}
