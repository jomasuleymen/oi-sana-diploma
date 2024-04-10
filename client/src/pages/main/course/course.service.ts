import $api from "@lib/http";
import { Specialist } from "@pages/specialist/specialist.service";
import { FetchDataParams, fetchData } from "@utils/data-fetcher";
import { z } from "zod";
import { User } from "../user/user.service";
import { CourseSchema } from "./course.schema";

export type Course = {
	id: string;
	title: string;
	description: string;
	coverImage: string;
	author: Specialist;
	slug: string;
	price: number;
	createdAt: string;
	rateCount: number;
	avgRate: number | null;
	lessons: Lesson[];
};

export type Lesson = {
	id: number;
	title: string;
	video: string;
};

export const COURSES_ENDPOINT = "/courses";

export type CreateCourseType = z.infer<typeof CourseSchema>;

export const createCourse = async (data: CreateCourseType) => {
	const response = await $api.post<Course>(COURSES_ENDPOINT, data);
	return response.data;
};

export const deleteCourse = async (id: number | string) => {
	const response = await $api.delete(`${COURSES_ENDPOINT}/${id}`);
	return response.data;
};

type GetCoursesParams = {
	page: number;
	userId?: number | string;
	name?: string;
};

export const getCourses = async (params: GetCoursesParams = { page: 1 }) => {
	const pagination: FetchDataParams["pagination"] = {
		pageSize: 100,
		pageIndex: params.page - 1,
	};

	const filters: FetchDataParams["columnFilters"] = [];

	if (params.userId) {
		filters.push({
			id: "author",
			value: params.userId,
		});
	}

	if (params.name) {
		filters.push({
			id: "title",
			value: {
				value: params.name,
				operation: "like",
			},
		});
	}

	const response = await fetchData<Course>({
		url: COURSES_ENDPOINT,
		pagination,
		columnFilters: filters,
	});
	return response;
};

export const getCourse = async (slug: string) => {
	const response = await $api.get<Course>(`${COURSES_ENDPOINT}/${slug}`);
	return response.data;
};

export interface CourseReview {
	id: number;
	rate: number;
	review: string;
	createdAt: string;
	user: Pick<User, "id" | "username" | "firstname" | "lastname" | "profileImage">;
	course: Pick<Course, "id" | "title" | "slug">;
}

export const sendReview = async (slug: string, rate: number, review: string) => {
	const response = await $api.post(`${COURSES_ENDPOINT}/${slug}/reviews`, {
		rate,
		review,
	});
	return response.data;
};

export const getLatestReviews = async (limit: number = 15) => {
	const response = await $api.get<CourseReview[]>(`${COURSES_ENDPOINT}/reviews/latest`, {
		params: {
			limit,
		},
	});
	return response.data;
};

export const getReviews = async (slug: string) => {
	const response = await $api.get<Omit<CourseReview, "course">[]>(
		`${COURSES_ENDPOINT}/${slug}/reviews`
	);
	return response.data;
};
