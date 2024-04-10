import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { PaginatedResource, getOrder, getWhere } from "src/lib/typeorm.util";
import { SpecialistService } from "src/specialist/specialist.service";
import { UserService } from "src/user/user.service";
import { slugifyText } from "src/utils/slug";
import { Equal, In, Repository } from "typeorm";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Course } from "./entities/course.entity";
import { Lesson } from "./entities/lesson.entity";
import { CourseReview } from "./entities/review.entity";
import { ROLE } from "src/user/user-roles";

@Injectable()
export class CourseService {
	constructor(
		@InjectRepository(Course)
		private courseRepository: Repository<Course>,
		@InjectRepository(CourseReview)
		private reviewRepository: Repository<CourseReview>,
		private readonly userSerivce: UserService,
		private readonly specialistService: SpecialistService,
	) {}

	async create(userId: number, dto: CreateCourseDto) {
		const spec = await this.specialistService.findOne(userId);
		if (!spec) {
			throw new BadRequestException("Specialist not found");
		}

		const exists = await this.courseRepository.exists({
			where: { title: Equal(dto.title), author: spec },
		});

		if (exists) {
			throw new BadRequestException("Course with this title already exists");
		}

		const course = this.courseRepository.create({
			title: dto.title,
			coverImage: dto.coverImage,
			description: dto.description,
			price: dto.price,
			author: spec,
			slug: slugifyText(dto.title),
			lessons: [],
		});

		dto.lessons.forEach(lessonDto => {
			const lesson = new Lesson();
			lesson.title = lessonDto.title;
			lesson.video = lessonDto.video;
			course.lessons.push(lesson);
		});

		return await this.courseRepository.save(course);
	}

	async addReview(slug: string, review: string, rate: number, userId: number) {
		const course = await this.courseRepository.findOneBy({ slug: slug });
		if (!course) {
			throw new BadRequestException("Course not found");
		}

		const user = await this.userSerivce.findById(userId);
		if (!user) {
			throw new BadRequestException("User not found");
		}

		const foundReview = await this.reviewRepository.findOne({
			where: {
				course: {
					id: course.id,
				},
				user: {
					id: user.id,
				},
			},
		});

		if (foundReview) {
			throw new BadRequestException("Review already exists");
		}

		const reviewEntity = this.reviewRepository.create();
		reviewEntity.course = course;
		reviewEntity.review = review;
		reviewEntity.rate = rate;
		reviewEntity.user = user;

		const avgRate = course.avgRate * course.rateCount + rate;
		course.rateCount += 1;
		course.avgRate = avgRate / course.rateCount;

		await this.courseRepository.manager.transaction(async manager => {
			await manager.save(reviewEntity);
			await manager.save(course);
		});
	}

	async getLatestReviews(limit: number) {
		return await this.reviewRepository.find({
			take: limit,
			order: {
				createdAt: "DESC",
			},
			relations: {
				course: true,
				user: true,
			},
			select: {
				course: {
					id: true,
					title: true,
					slug: true,
				},
				user: {
					id: true,
					username: true,
					firstname: true,
					lastname: true,
					profileImage: true,
				},
				id: true,
				createdAt: true,
				rate: true,
				review: true,
			},
		});
	}

	async getReviews(slug: string) {
		return await this.reviewRepository.find({
			order: {
				createdAt: "DESC",
			},
			where: {
				course: {
					slug,
				},
			},
			relations: {
				course: true,
				user: true,
			},
			select: {
				user: {
					id: true,
					username: true,
					firstname: true,
					lastname: true,
					profileImage: true,
				},
				id: true,
				createdAt: true,
				rate: true,
				review: true,
			},
		});
	}

	async findBy(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	): Promise<PaginatedResource<Course>> {
		const where = getWhere<Course>(filter);
		const order = getOrder(sort);

		if (where.author) {
			where.author = {
				userId: where.author as number,
			};
		}

		const [items, count] = await this.courseRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: {
				author: {
					user: true,
				},
				lessons: true,
			},
		});

		return {
			totalItems: count,
			items,
			pageCount: Math.ceil(count / size),
		};
	}

	async findReviewsBy(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	): Promise<PaginatedResource<CourseReview>> {
		const where = getWhere<CourseReview>(filter);
		const order = getOrder(sort);

		const [items, count] = await this.reviewRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset,
			relations: {
				course: true,
				user: true,
			},
		});

		return {
			totalItems: count,
			items,
			pageCount: Math.ceil(count / size),
		};
	}

	async findOneBySlug(slug: string) {
		const data = await this.courseRepository.findOne({
			where: { slug },
			relations: {
				author: {
					user: true,
				},
				lessons: true,
			},
		});

		return data;
	}

	async findLessonById(id: string) {
		return await this.courseRepository.findOne({
			where: { id },
			relations: {
				lessons: true,
			},
		});
	}

	async deleteById(id: Course["id"], userId: number) {
		if (!userId) {
			throw new BadRequestException("User not found");
		}

		const course = await this.courseRepository.findOne({
			where: { id },
			relations: {
				author: {
					user: true,
				},
			},
		});

		if (!course) {
			throw new BadRequestException("Course not found");
		}

		if (
			course.author.userId !== userId &&
			course.author.user.role !== ROLE.ADMIN
		) {
			throw new BadRequestException("You can't delete this course");
		}

		return await this.courseRepository.delete({ id: Equal(id) });
	}

	async deleteManyById(ids: Course["id"][]) {
		return await this.courseRepository.delete(ids);
	}

	async deleteReviewById(id: Course["id"], userId: number) {
		if (!userId) {
			throw new BadRequestException("User not found");
		}

		const review = await this.reviewRepository.findOne({
			where: { id },
			relations: ["user"],
		});

		if (!review) {
			throw new BadRequestException("Review not found");
		}

		if (review.user.id !== userId || review.user.role !== ROLE.ADMIN) {
			throw new BadRequestException("You can't delete this course");
		}

		return await this.reviewRepository.delete({ id: Equal(id) });
	}

	async deleteManyReviewsById(ids: Course["id"][]) {
		const reviews = await this.reviewRepository.find({
			where: {
				id: In(ids),
			},
			relations: ["course"],
		});

		const courseIds = reviews.map(review => review.course.id);
		const courses = await this.courseRepository.find({
			where: {
				id: In(courseIds),
			},
		});

		courses.forEach(course => {
			const courseReviews = reviews.filter(
				review => review.course.id === course.id,
			);

			const avgRate = course.avgRate * course.rateCount;
			course.rateCount -= courseReviews.length;
			if (course.rateCount === 0) {
				course.avgRate = 0;
			} else {
				course.avgRate = avgRate / course.rateCount;
			}
		});

		await this.courseRepository.manager.transaction(async manager => {
			await manager.remove(reviews);
			await manager.save(courses);
		});
	}
}
