import { Course } from "@pages/main/course/course.service";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { memo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	course: Course;
	setLesson: React.Dispatch<React.SetStateAction<number>>;
	lessonIndex: number;
	children: ReactNode;
};

const ActionButton: React.FC<{ isNext: boolean }> = ({ isNext }) => {
	return (
		<div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
			{isNext ? <ChevronRightIcon /> : <ChevronLeftIcon />}
		</div>
	);
};

const PrevButton: React.FC<Pick<Props, "setLesson">> = ({ setLesson }) => {
	const handlePrev = () => {
		setLesson((prev) => {
			if (prev === 0) {
				return prev;
			}

			return prev - 1;
		});
	};

	return (
		<div
			className="flex flex-col items-center justify-center gap-2 cursor-pointer"
			onClick={handlePrev}
		>
			<ActionButton isNext={false} />
			<span className="text-sm font-semibold">Prev</span>
		</div>
	);
};

const NextButton: React.FC<{
	setLesson: Props["setLesson"];
	maxLength: number;
	hasNext: boolean;
}> = ({ setLesson, maxLength, hasNext }) => {
	const navigate = useNavigate();

	const handleNext = () => {
		if (hasNext) {
			setLesson((prev) => {
				if (prev >= maxLength) {
					return prev;
				}

				return prev + 1;
			});
		} else {
			navigate("review");
		}
	};
	return (
		<div
			className="flex flex-col items-center justify-center gap-2 cursor-pointer"
			onClick={handleNext}
		>
			<ActionButton isNext={true} />
			<span className="text-sm font-semibold">{hasNext ? "Next" : "End"}</span>
		</div>
	);
};

const CourseContent: React.FC<Props> = ({ course, setLesson, lessonIndex, children }) => {
	const hasNext = lessonIndex < course.lessons.length - 1;
	const hasPrev = lessonIndex > 0;

	return (
		<div className="flex items-center justify-between select-none">
			<div className="min-w-12">{hasPrev && <PrevButton setLesson={setLesson} />}</div>
			{children}
			<NextButton
				setLesson={setLesson}
				maxLength={course.lessons.length - 1}
				hasNext={hasNext}
			/>
		</div>
	);
};

export default memo(CourseContent);
