import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";
import Container from "@components/ui/container";
import Plyr from "plyr-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../hooks/use-course";
import CourseContent from "./components/CourseContent";
import CourseHeader from "./components/CourseHeader";

type Props = {};

const CourseViewPage: React.FC<Props> = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	if (!slug) {
		navigate("/");
		return null;
	}

	const { isLoading, item: course } = useCourse(slug);
	const [lessonIndex, setLessonIndex] = useState(0);

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

	const lesson = course.lessons[lessonIndex];

	return (
		<Container transparent>
			<CourseContent course={course} setLesson={setLessonIndex} lessonIndex={lessonIndex}>
				<div className="flex flex-col gap-4">
					<CourseHeader
						course={course}
						setLesson={setLessonIndex}
						lessonIndex={lessonIndex}
					/>
					<div className="w-[630px] h-[354px]">
						<Plyr
							width="100%"
							source={{
								type: "video",
								sources: [
									{
										src:
											import.meta.env.VITE_SERVER_URL +
											"/uploads/stream/" +
											lesson.video,
										type: "video/mp4",
									},
								],
							}}
						/>
					</div>
				</div>
			</CourseContent>
		</Container>
	);
};

export default CourseViewPage;
