import { Star } from "lucide-react";
import React from "react";

type Props = {
	maxRating: number;
	rating: number;
	size?: number;
};

const RatingStars: React.FC<Props> = ({ maxRating, rating, size = 14 }) => {
	const ratingColor = "#FCBD2D";
	return (
		<div className="flex gap-1 items-center">
			{Array.from({ length: maxRating }, (_, i) => {
				const starNumber = i + 1;
				const isFilled = starNumber <= rating;
				return (
					<Star
						key={i}
						size={size}
						color={ratingColor}
						fill={isFilled ? ratingColor : "white"}
					/>
				);
			})}
		</div>
	);
};

export default RatingStars;
