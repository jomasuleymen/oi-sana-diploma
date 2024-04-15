import Loading from "@components/loading";
import CourseOptions from "@pages/specialist/profile/components/profile-courses/options";
import React from "react";
import { useCourses } from "../../hooks/use-courses";
import CourseCard from "./course-card";
import CoursesNotFound from "./courses-notfound";

type Props = {
	specialistId?: string | number;
	withOptions?: boolean;
	search?: string;
	myEnrolledCourses?: boolean;
};

const CoursesListPage: React.FC<Props> = ({
	specialistId,
	withOptions,
	search,
	myEnrolledCourses,
}) => {
	const { items, isLoading } = useCourses({
		specId: specialistId,
		search,
		my: myEnrolledCourses,
	});

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
