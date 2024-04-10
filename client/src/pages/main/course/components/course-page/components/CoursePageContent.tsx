import Typography from "@components/ui/typography";
import { Course } from "@pages/main/course/course.service";
import { MonitorPlay, Lock } from "lucide-react";
import React from "react";

type Props = {
	course: Course;
};

const CoursePageContent: React.FC<Props> = ({ course }) => {
	return (
		<div className="flex flex-col items-center">
			<Typography variant="h3" className="mb-2">
				Course content
			</Typography>
			<div className="max-w-4xl min-w-xl w-full">
				<div className="border-[1px] border-solid border-gray-300">
					<div className="p-4 bg-[#F7F9FA] border-b-gray-300 border-solid border-[1px] font-bold">
						{course.title}
					</div>
					<div className="p-4 flex flex-col gap-2">
						{course.lessons.map((lesson, index) => (
							<div key={index} className="flex items-center">
								<div className="flex items-center gap-2 text-sm flex-1">
									<div>
										<MonitorPlay size={15} className="align-middle" />
									</div>
									<span>{lesson.title}</span>
								</div>
								<div>
									<Lock size={15} className="align-middle" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursePageContent;
