import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import { Star } from "lucide-react";
import React from "react";
import { Course } from "../../course.service";

type Props = {
	course: Course;
};

const ReviewHeader: React.FC<Props> = ({ course }) => {
	return (
		<div className="flex flex-col gap-4">
			<Typography variant="h1">Congratulations!</Typography>
			<Typography variant="h5">
				You have completed the course “{course.title}” Leave a review about the course,
				thereby you will help us improve our service.
			</Typography>
			<Card className="p-4 pt-7 flex gap-3 items-center drop-shadow-[0px_2px_24px_rgba(0,_1,_83,_0.07)] border-none relative">
				<div className="w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14">
					<ServerImage src={course.coverImage} className="w-full h-full rounded-lg object-cover" />
				</div>
				<div>
					<Typography variant="h5">{course.title}</Typography>
					<span className="text-xs">
						COMPLETED: LESSON {course.lessons.length} OF {course.lessons.length}
					</span>
				</div>
				<div className="absolute right-2 top-2 flex items-center gap-1">
					<div>
						<Star size={18} fill="#FCBD2D" color="FCBD2D" />
					</div>
					<div className="text-xs">
						<span className="font-semibold">{(course.avgRate || 0).toFixed(1)}</span>
						<span className="text-gray-500 ml-1">({course.rateCount || 0})</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ReviewHeader;
