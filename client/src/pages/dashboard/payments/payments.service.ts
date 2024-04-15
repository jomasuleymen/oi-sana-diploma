import { Course } from "@pages/main/course/course.service";
import { User } from "@pages/main/user/user.service";
import { fetchData, FetchDataParams } from "@utils/data-fetcher";

const PAYMENTS_ENDPOINT = "/payment";

export interface Payment {
	orderId: string;
	user: User;
	course: Course;
	amount: string;
	isPaid: boolean;
	createdAt: Date;
	paidAt: Date;
}

export const getLatestPayments = async () => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 5,
		pageIndex: 0,
	};

	const response = await fetchData<Payment>({
		url: PAYMENTS_ENDPOINT,
		pagination,
		sorting: [{ id: "paidAt", desc: true }],
	});
	return response;
};
