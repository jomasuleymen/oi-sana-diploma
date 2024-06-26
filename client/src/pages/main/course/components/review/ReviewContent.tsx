import { Textarea } from "@components/ui/textarea";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import { Button } from "@components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import styled from "styled-components";
import { Course, sendReview } from "../../course.service";

type Props = {
	course: Course;
};

const CustomRating = styled(Rating)`
	svg {
		display: inline-block;
	}
`;

const ReviewContent: React.FC<Props> = ({ course }) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");

	const handleSendReview = () => {
		if (!rating) {
			toast.error("Rate the course");
			return;
		}

		if (!review) {
			toast.error("Review can not be empty");
			return;
		}

		sendReview(course.slug, rating, review)
			.then(() => {
				toast.success("Thanks for your feedback!");
				setRating(0);
				setReview("");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<div className="w-full mt-16">
			<div className="text-sm text-gray-500 font-semibold mb-1">Your feedback</div>
			<div className="flex mb-3">
				<CustomRating
					onClick={(rate: number) => setRating(rate)}
					initialValue={rating}
					size={45}
				/>
			</div>
			<div className="flex gap-2 items-end">
				<Textarea
					placeholder="Write a review about the course or platform"
					rows={7}
					className="resize-none flex-1 font-semibold bg-[#F5F5F5]"
					value={review}
					onChange={(e) => setReview(e.target.value)}
				/>
				<Button className="rounded-full p-3" onClick={handleSendReview}>
					<Send size={15} />
				</Button>
			</div>
		</div>
	);
};

export default ReviewContent;
