import React from "react";
import { CourseReview } from "../course/course.service";
import AvatarWrapper from "@components/ui/avatar-wrapper";
import { getElapsedTime } from "@utils/utils";
import { Link } from "react-router-dom";
import { Card } from "@components/ui/card";

type Props = {
	review: CourseReview;
};

const ReviewCard: React.FC<Props> = ({ review }) => {
	return (
		<Card key={review.id} className="mb-4 select-none p-3">
			<div className="flex items-center gap-2">
				<AvatarWrapper
					src={review.user.profileImage}
					username={review.user.username}
					className="w-8 h-8 rounded-sm bg-none text-sm"
				/>
				<div className="text-sm font-bold">{review.user.username}</div>
				<div className="text-xs font-semibold text-gray-500">
					{getElapsedTime(review.createdAt)}
				</div>
			</div>
			<div className="mt-2">
				<div className="text-base text-gray-800 break-words line-clamp-4">
					{review.review}
				</div>
			</div>
			<div className="mt-2 text-sm font-bold">
				<Link to={`/courses/${review.course.slug}`} className="text-sm line-clamp-1">
					{review.course.title}
				</Link>
			</div>
		</Card>
	);
};

export default ReviewCard;
