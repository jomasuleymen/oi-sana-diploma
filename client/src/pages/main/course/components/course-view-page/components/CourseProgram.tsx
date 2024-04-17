import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@components/ui/sheet";
import { Course, Lesson } from "@pages/main/course/course.service";
import { SquarePlay } from "lucide-react";
import React, { memo } from "react";
import PlayRound from "../../../assets/play-round.svg?url";

type Props = {
	course: Course;
	setLesson: React.Dispatch<React.SetStateAction<number>>;
};

const CourseProgram: React.FC<Props> = ({ course, setLesson }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<div className="flex">
					<div className="flex gap-1 p-2 bg-[#F0F0F0] text-[#464646] text-xs items-center font-semibold rounded-md">
						<SquarePlay color="#464646" /> Course program
					</div>
				</div>
			</SheetTrigger>
			<SheetContent className="w-[400px] sm:w-[540px]">
				<SheetHeader>
					<SheetTitle className="text-lg font-bold mb-2">Course program</SheetTitle>
					<div className="flex flex-col gap-2">
						{course.lessons.map((lesson: Lesson, idx) => (
							<SheetClose asChild>
								<div
									key={lesson.id}
									onClick={() => setLesson(idx)}
									className="flex gap-2 cursor-pointer items-center"
								>
									<div>
										<div className="rounded-full flex items-center justify-center w-5 h-5">
											<img
												src={PlayRound}
												alt="play"
												className="w-full h-full"
											/>
										</div>
									</div>
									<div>
										<p className="text-[14px] font-medium">
											{idx + 1}. {lesson.title}
										</p>
									</div>
								</div>
							</SheetClose>
						))}
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default memo(CourseProgram);
