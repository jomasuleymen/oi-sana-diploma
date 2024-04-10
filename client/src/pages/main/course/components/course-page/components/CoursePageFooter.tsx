import Loading from "@components/loading";
import RatingStars from "@components/stars";
import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Course } from "@pages/main/course/course.service";
import { useReviews } from "@pages/main/course/hooks/use-reviews";
import { getElapsedTime } from "@utils/utils";
import { Dot, Star } from "lucide-react";
import React from "react";

type Props = {
	course: Course;
};

const CoursePageFooter: React.FC<Props> = ({ course }) => {
	const { isLoading, item: reviews } = useReviews(course.slug);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="p-2 flex flex-col max-w-4xl mx-auto">
			<div className="p-4 pl-0 flex gap-2 items-center leading-7 text-[24px] font-bold">
				<div>
					<Star size={20} color="#FCBD2D" fill="#FCBD2D" />
				</div>
				<div className="flex items-center">
					{course.avgRate} course rating <Dot size={40} fill="#6A6F73" color="#6A6F73" />{" "}
					{course.rateCount} ratings
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{reviews.map((review, index) => (
					<div key={index} className="border-b-gray-300 border-solid border-t-[1px] pt-4">
						<div className="header flex items-center mb-4 gap-4">
							<div>
								<AvatarWrapper
									src={review.user.profileImage}
									username={review.user.username}
								/>
							</div>
							<div>
								<div className="font-bold text-base">{review.user.username}</div>
								<div className="flex gap-2">
									<RatingStars maxRating={5} rating={review.rate} size={11} />
									<span className="text-xs font-bold text-[#6A6F73]">
										{getElapsedTime(review.createdAt, {
											includeLongDate: true,
										})}{" "}
										ago
									</span>
								</div>
							</div>
						</div>

						<div className="content">{review.review}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CoursePageFooter;
