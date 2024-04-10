import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { Course } from "@pages/main/course/course.service";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./course-columns";

const COURSES_API_ENDPOINT = "/courses";
const COURSES_QUERY_KEY = "courses";

const deleteCourses = async (courses: Course | Course[]) => {
	const id = Array.isArray(courses) ? courses.map((course) => course.id) : courses.id;
	return $api.delete(COURSES_API_ENDPOINT + "/many", { data: { id } });
};

export const CoursesTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = COURSES_QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (course: Course | Course[]) => {
			await deleteCourses(course)
				.catch((err) => {})
				.finally(() => {
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				});
		},
		[queryClient, queryKey]
	);

	const columns = useMemo(
		() => generateColumns({ onRowDeleteAction: deleteRowsAction }),
		[deleteRowsAction]
	);

	return (
		<div className={cn("h-full flex-1 space-y-4 pt-6")}>
			<div className="flex items-start justify-between">
				<Heading title="Courses" description="Manage courses" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={COURSES_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
