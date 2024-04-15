import RatingStars from "@components/stars";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import { buyCourse, Course } from "@pages/main/course/course.service";
import { formatDate } from "@utils/utils";
import { OctagonAlert } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
	course: Course;
};

const CoursePageHeader: React.FC<Props> = ({ course }) => {
	const buyCourseHandle = () => {
		buyCourse(course.id).then((res) => {
			if (res) {
				window.location.href = res.redirectUrl;
			}
		});
	};

	return (
		<div className="bg-[#F7F9FA] p-2 flex">
			<div className="flex-1 px-12 my-auto">
				<div className="mb-6">
					<div className="text-3xl text-[32px] font-bold mb-3">{course.title}</div>
					<div className="text-xl text-[19px] font-normal text-[#2D2F31]">
						{course.description}
					</div>
				</div>

				<div>
					<div className="flex gap-2 items-center mb-2">
						<div className="rating flex gap-2 items-center font-semibold">
							{course.avgRate !== null && course.avgRate.toFixed(1)}{" "}
							<RatingStars maxRating={5} rating={course.avgRate || 0} size={11} />
						</div>
						<div className="text-blue-600 text-sm underline">
							({Number(course.rateCount).toLocaleString("en-US")} ratings)
						</div>
					</div>
					<div className="text-sm">
						<div className="mb-2">
							Created by{" "}
							<Link
								to={`/specialists/${course.author.userId}`}
								className="text-blue-600 underline"
							>
								{course.author.user.username}
							</Link>
						</div>
						<div className="flex gap-2 items-center">
							<OctagonAlert size={15} />
							<div>Created on {formatDate(course.createdAt)}</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-[340px]">
				<Card className="p-0 m-0">
					<div className="w-full h-[191px] mb-5">
						<ServerImage
							src={course.coverImage}
							alt={course.title}
							className="w-full h-full object-fill"
						/>
					</div>
					<div className="p-4">
						{course.enrolled || course.price === 0 ? (
							<div>
								<Link to={`/courses/view/${course.slug}`}>
									<Button className="w-full mt-4">Go to course</Button>
								</Link>
								<Link to={`/courses/view/${course.slug}/review`}>
									<Button className="w-full mt-4">Rate</Button>
								</Link>
							</div>
						) : (
							<div>
								<Typography variant="h3">{course.price} KZT</Typography>
								<Button className="w-full mt-4" onClick={buyCourseHandle}>
									Buy now
								</Button>
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default CoursePageHeader;
