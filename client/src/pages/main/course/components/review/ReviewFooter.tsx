import React from "react";
import { Course } from "../../course.service";
import { Link } from "react-router-dom";

type Props = {
	course: Course;
};

const ReviewFooter: React.FC<Props> = ({ course }) => {
	return (
		<div className="flex">
			<Link to={`/courses/${course.slug}`}>
				<div className="text-[#808191] cursor-pointer border-solid border-[2px] border-[#F5F5F5] px-[30px] py-[11px] font-semibold text-base flex items-center justify-center rounded-sm mt-10 mb-5">
					Later
				</div>
			</Link>
		</div>
	);
};

export default ReviewFooter;
