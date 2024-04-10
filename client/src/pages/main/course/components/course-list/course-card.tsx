import RatingStars from "@components/stars";
import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import { capitalize } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { Course } from "../../course.service";

type Props = {
	course: Course;
};

const CourseDetails: React.FC<Props> = ({ course }) => {
	return (
		<div className="flex-1 py-1 px-2 flex flex-col justify-between">
			<div className="flex flex-col gap-1">
				<Link to={course.slug} className="m-0 p-0 flex flex-col gap-0">
					<span className="font-semibold text-base line-clamp-2">
						{capitalize(course.title)}
					</span>
					<span className="text-xs text-gray-500">
						{capitalize(course.author.user.username)}
					</span>
				</Link>
				<div className="flex items-center">
					<div className="flex items-center gap-1 align-middle">
						<span className="font-semibold text-base align-middle">
							{course.avgRate}
						</span>
						<RatingStars rating={course.avgRate || 0} maxRating={5} size={10} />
						<span className="text-xs text-gray-500">
							({(course.rateCount || 0).toLocaleString("en-US")})
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between font-semibold">
				<div className="">{Number(course.price).toLocaleString("ru-RU")} ₸</div>
			</div>
		</div>
	);
};

const CourseCard: React.FC<Props> = ({ course }) => {
	return (
		<Card className="w-full min-h-[280px] md:w-[280px] overflow-hidden flex flex-col rounded-none">
			<div className="h-[150px] w-full">
				<Link to={`/courses/${course.slug}`}>
					<ServerImage
						src={course.coverImage}
						alt={course.title}
						className="h-full w-full object-cover overflow-clip"
					/>
				</Link>
			</div>
			<CourseDetails course={course} />
		</Card>
	);
};

export default CourseCard;
