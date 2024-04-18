import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
} from "@nestjs/common";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import UseSession from "src/auth/decorators/use-session.decorator";
import { UserSession } from "src/auth/dto/session-user.dto";
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
import { PaymentService } from "src/payment/payment.service";
import { DeleteManyDTO } from "src/user/dto/user-delete.dto";
import { ROLE } from "src/user/user-enums";
import { CourseService } from "./course.service";
import { CourseReviewDTO } from "./dto/course-review.dto";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Course } from "./entities/course.entity";
import { CourseReview } from "./entities/review.entity";

@Controller("courses")
export class CourseController {
	constructor(
		private readonly courseService: CourseService,
		private readonly paymentService: PaymentService,
	) {}

	@Post()
	@UseAuthorized(ROLE.SPECIAL, ROLE.ADMIN)
	async create(
		@Body() createCourseDto: CreateCourseDto,
		@UseSession() session: UserSession,
	) {
		return await this.courseService.create(session.id, createCourseDto);
	}

	@Get()
	@UseAuthorized()
	async findAll(
		@UseSession() session: UserSession,
		@PaginationParams() pagination: Pagination,
		@SortingParams<Course>(["title"]) sort?: Sorting[],
		@FilteringParams<Course>(["title", "author"]) filter?: Filtering[],
		@Query("my") my?: boolean,
	) {
		if (my) {
			return await this.courseService.findBy(
				pagination,
				sort,
				filter,
				session.id,
			);
		}
		return await this.courseService.findBy(pagination, sort, filter);
	}

	@Get("reviews")
	@UseAuthorized(ROLE.ADMIN)
	async findAllReviews(
		@PaginationParams() pagination: Pagination,
		@SortingParams<CourseReview>(["rate"]) sort?: Sorting[],
		@FilteringParams<CourseReview>(["course.title", "user.username"])
		filter?: Filtering[],
	) {
		return await this.courseService.findReviewsBy(pagination, sort, filter);
	}

	@Get(":slug")
	@UseAuthorized()
	async findOne(
		@Param("slug") slug: string,
		@UseSession() session: UserSession,
	) {
		return this.courseService.findOneBySlug(slug, session);
	}

	@Get("enroll/:id")
	@UseAuthorized()
	async enroll(
		@Param("id") courseId: string,
		@UseSession() session: UserSession,
	) {
		const redirectData = await this.paymentService.createOrder({
			userId: session.id,
			courseId,
		});

		return {
			redirectUrl: redirectData.url,
		};
	}

	@Post(":slug/reviews")
	@UseAuthorized()
	async postReview(
		@Param("slug") slug: string,
		@Body() review: CourseReviewDTO,
		@UseSession() session: UserSession,
	) {
		return await this.courseService.addReview(
			slug,
			review.review,
			review.rate,
			session.id,
		);
	}

	@Get("reviews/latest")
	async getLatestReviews(@Query("limit") limit: number = 15) {
		return await this.courseService.getLatestReviews(limit);
	}

	@Get(":slug/reviews")
	async getReviews(@Param("slug") slug: string) {
		return await this.courseService.getReviews(slug);
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("many")
	async deleteMany(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.courseService.deleteManyById(dto.id as any);

		return { message: "Курсы успешно удалены" };
	}

	@UseAuthorized(ROLE.ADMIN, ROLE.SPECIAL)
	@Delete(":id")
	async deleteOne(@Param("id") id: string, @UseSession() user: UserSession) {
		await this.courseService.deleteById(id, user.id);

		return { message: "Курс успешно удален" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Delete("reviews/many")
	async deleteManyReviews(@Body() dto: DeleteManyDTO) {
		if (typeof dto.id === "string") dto.id = [dto.id];
		await this.courseService.deleteManyReviewsById(dto.id as any);

		return { message: "Отзывы успешно удалены" };
	}

	@UseAuthorized(ROLE.ADMIN)
	@Get("statistics/count")
	async countStatistics() {
		return await this.courseService.getCountStatistics();
	}
}
