import Typography from "@components/ui/typography";
import { Course } from "@pages/main/course/course.service";
import { memo } from "react";
import CourseProgram from "./CourseProgram";

type Props = {
	course: Course;
	lessonIndex: number;
	setLesson: React.Dispatch<React.SetStateAction<number>>;
};

const CourseHeader: React.FC<Props> = ({ course, lessonIndex, setLesson }) => {
	const lesson = course.lessons[lessonIndex];

	return (
		<div className="flex flex-col">
			<Typography variant="h2">{course.title}</Typography>
			<span className="font-bold text-lg mb-3">
				{lessonIndex + 1} of {course.lessons.length} - {lesson.title}
			</span>
			<CourseProgram course={course} setLesson={setLesson} />
		</div>
	);
};

export default memo(CourseHeader);
