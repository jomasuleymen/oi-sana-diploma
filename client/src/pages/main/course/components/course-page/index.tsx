import Container from "@components/ui/container";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../hooks/use-course";
import CoursePageContent from "./components/CoursePageContent";
import CoursePageFooter from "./components/CoursePageFooter";
import CoursePageHeader from "./components/CoursePageHeader";
import EmptyDataPage from "@components/empty-data";
import Loading from "@components/loading";

type Props = {};

const CoursePage: React.FC<Props> = ({}) => {
	const { slug } = useParams();
	const navigate = useNavigate();

	if (!slug) {
		navigate("/");
		return null;
	}

	const { isLoading, item: course } = useCourse(slug);

	if (isLoading) {
		return <Loading />;
	}

	if (!course) {
		return (
			<Container>
				<EmptyDataPage />
			</Container>
		);
	}

	return (
		<Container className="max-w-6xl p-0 overflow-hidden">
			<CoursePageHeader course={course} />
			<div className="mt-8 py-4 px-6 pb-10 space-y-6">
				<CoursePageContent course={course} />
				<CoursePageFooter course={course} />
			</div>
		</Container>
	);
};

export default CoursePage;
