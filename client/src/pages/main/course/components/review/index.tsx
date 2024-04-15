import Container from "@components/ui/container";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../hooks/use-course";
import ReviewHeader from "./ReviewHeader";
import ReviewContent from "./ReviewContent";
import ReviewFooter from "./ReviewFooter";
import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";

type Props = {};

const ReviewCoursePage: React.FC<Props> = ({}) => {
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
				<NoDataFound />
			</Container>
		);
	}

	return (
		<Container transparent>
			<ReviewHeader course={course} />
			<ReviewContent course={course} />
			<ReviewFooter course={course} />
		</Container>
	);
};

export default ReviewCoursePage;
