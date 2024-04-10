import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./course-reviews-columns";
import { CourseReview } from "@pages/main/course/course.service";

const API_ENDPOINT = "/courses/reviews";
const QUERY_KEY = "courses-reviews";

const deleteCourseReviews = async (coursereviews: CourseReview | CourseReview[]) => {
	const id = Array.isArray(coursereviews)
		? coursereviews.map((coursereview) => coursereview.id)
		: coursereviews.id;
	return $api.delete(API_ENDPOINT + "/many", { data: { id } });
};

export const CourseReviewsTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (coursereview: CourseReview | CourseReview[]) => {
			await deleteCourseReviews(coursereview)
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
				<Heading title="CourseReviews" description="Manage coursereviews" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
