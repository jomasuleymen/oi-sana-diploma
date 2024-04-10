import React from "react";
import { useCourses } from "../../hooks/use-courses";
import CourseCard from "./course-card";
import CoursesNotFound from "./courses-notfound";
import CourseOptions from "@pages/specialist/profile/components/profile-courses/options";
import Loading from "@components/loading";

type Props = {
	specialistId?: string | number;
	withOptions?: boolean;
	search?: string;
};

const CoursesListPage: React.FC<Props> = ({ specialistId, withOptions, search }) => {
	const { items, isLoading } = useCourses({ userId: specialistId, search });

	if (isLoading) {
		return <Loading />;
	}

	if (!items.length) {
		return <CoursesNotFound />;
	}

	return (
		<div className="grid grid-cols-3 gap-4 w-full">
			{items.map((course) => (
				<div className="relative" key={course.id}>
					<CourseCard key={course.id} course={course} />
					{withOptions && <CourseOptions course={course} />}
				</div>
			))}
		</div>
	);
};

export default CoursesListPage;
