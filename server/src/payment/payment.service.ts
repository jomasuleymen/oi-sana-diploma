import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { CourseService } from "src/course/course.service";
import { Filtering } from "src/decorators/filtering-params.decorator";
import { Pagination } from "src/decorators/pagination-params.decorator";
import { Sorting } from "src/decorators/sorting-params.decorator";
import { getOrder, getWhere } from "src/lib/typeorm.util";
import { UserService } from "src/user/user.service";
import { isProd } from "src/utils/constants";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Payment } from "./entities/payment.entity";
import { KassaRedirect, PaymentPayload } from "./payment.types";

@Injectable()
export class PaymentService {
	private readonly CLIENT_DOMAIN: string;
	private readonly DOMAIN: string;
	private readonly KASSA_ID: string;
	private readonly KASSA_PASSWORD: string;

	private readonly TENGE_TO_TIYN: number = 100;

	constructor(
		private readonly userService: UserService,
		private readonly courseService: CourseService,
		private readonly configService: ConfigService,
		@InjectRepository(Payment)
		private paymentRepo: Repository<Payment>,
	) {
		this.CLIENT_DOMAIN = this.configService.getOrThrow("CLIENT_DOMAIN");
		this.DOMAIN = this.configService.getOrThrow("DOMAIN");
		this.KASSA_ID = this.configService.getOrThrow("KASSA_ID");
		this.KASSA_PASSWORD = this.configService.getOrThrow("KASSA_PASSWORD");
	}

	async createOrder(dto: CreateOrderDTO) {
		const user = await this.userService.findById(dto.userId);
		if (!user) throw new BadRequestException("User not found");

		const course = await this.courseService.findById(dto.courseId);
		if (!course) throw new BadRequestException("Course not found");

		const paymentPayload: PaymentPayload = {
			amount: course.price * this.TENGE_TO_TIYN,
			merchantId: this.KASSA_ID,
			demo: isProd ? false : true,
			orderId: uuidv4(),
			description: `Payment for ${course.title}`,
			customerData: {
				email: user.email,
			},
			metadata: {
				courseId: course.id,
				userId: user.id,
			},
			returnUrl: `${this.CLIENT_DOMAIN}/courses/${course.slug}`,
			successUrl: `${this.CLIENT_DOMAIN}/courses/${course.slug}`,
			failUrl: `${this.CLIENT_DOMAIN}/courses/${course.slug}`,
			callbackUrl: `${this.DOMAIN}/api/payment/callback`,
		};

		const redirectData = await this.generateSignature(paymentPayload);

		await this.paymentRepo.save({
			amount: paymentPayload.amount / 100,
			orderId: paymentPayload.orderId,
			isPaid: false,
			user,
			course,
		});

		return redirectData;
	}

	private async generateSignature(payload: PaymentPayload) {
		const hash = Buffer.from(
			`${this.KASSA_ID}:${this.KASSA_PASSWORD}`,
		).toString("base64");

		const data = await axios.post<PaymentPayload, { data: KassaRedirect }>(
			"https://ecommerce.pult24.kz/payment/create",
			payload,
			{
				headers: {
					Authorization: `Basic ${hash}`,
					"Content-Type": "application/json",
				},
			},
		);

		return data.data;
	}

	async completePayment(orderId: string) {
		const payment = await this.paymentRepo.findOne({
			where: { orderId },
			relations: ["user", "course"],
		});
		if (!payment) throw new BadRequestException("Payment not found");

		const { user, course } = payment;

		await this.courseService.giveAccessToCourse(course.id, user.id);

		payment.isPaid = true;
		payment.paidAt = new Date();
		await this.paymentRepo.save(payment);

		return payment;
	}

	async findAll(
		{ size, limit, offset }: Pagination,
		sort?: Sorting[],
		filter?: Filtering[],
	) {
		const where = getWhere<Payment>(filter);
		const order = getOrder(sort);

		const [articles, count] = await this.paymentRepo.findAndCount({
			where: {
				...where,
				isPaid: true,
			},
			order,
			take: limit,
			skip: offset,
			relations: {
				course: {
					author: {
						user: true,
					},
				},
				user: true,
			},
		});

		return {
			totalItems: count,
			items: articles,
			pageCount: Math.ceil(count / size),
		};
	}

	async getAmountStatistics() {
		// calculate this month and last month payments sum
		const thisMonthSql = this.paymentRepo
			.createQueryBuilder("p")
			.select("SUM(p.amount)")
			.where("EXTRACT(MONTH FROM p.paidAt) = EXTRACT(MONTH FROM CURRENT_DATE)")
			.andWhere("p.isPaid = true")
			.getRawOne();

		const lastMonthSql = this.paymentRepo
			.createQueryBuilder("p")
			.select("SUM(p.amount)")
			.where(
				"EXTRACT(MONTH FROM p.paidAt) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')",
			)
			.andWhere("p.isPaid = true")
			.getRawOne();

		const [thisMonthSum, lastMonthSum] = await Promise.all([
			thisMonthSql,
			lastMonthSql,
		]);

		return {
			thisMonth: Number(thisMonthSum?.sum) || 0,
			lastMonth: Number(lastMonthSum?.sum) || 0,
		};
	}

	async getSalesStatistics() {
		const thisMonthSql = this.paymentRepo
			.createQueryBuilder("p")
			.select("COUNT(*)")
			.where("EXTRACT(MONTH FROM p.paidAt) = EXTRACT(MONTH FROM CURRENT_DATE)")
			.andWhere("p.isPaid = true")
			.getRawOne();

		const lastMonthSql = this.paymentRepo
			.createQueryBuilder("p")
			.select("COUNT(*)")
			.where(
				"EXTRACT(MONTH FROM p.paidAt) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')",
			)
			.andWhere("p.isPaid = true")
			.getRawOne();

		const [thisMonthCount, lastMonthCount] = await Promise.all([
			thisMonthSql,
			lastMonthSql,
		]);

		return {
			thisMonth: Number(thisMonthCount?.count) || 0,
			lastMonth: Number(lastMonthCount?.count) || 0,
		};
	}

	async getAmountStatisticsByMonth() {
		const sqlBuilder = this.paymentRepo.createQueryBuilder("p");
		sqlBuilder
			.select("DATE_TRUNC('month', p.paidAt)", "date")
			.addSelect("SUM(amount)", "count")
			.where("p.isPaid = true")
			.groupBy("date")
			.orderBy("date", "ASC");

		return await sqlBuilder.getRawMany();
	}
}
