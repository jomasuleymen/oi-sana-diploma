import RatingStars from "@components/stars";
import Typography from "@components/ui/typography";
import React from "react";
import Slider from "react-slick";
import { Divider } from "../components/divider";
import QuoteMark from "../components/quote-mark";
import { appReviews } from "./reviews";

type Review = {
	rate: number;
	review: string;
	name: string;
};

type Props = {};

const AppReviews: React.FC<Props> = ({}) => {
	return (
		<div>
			<div className="heading text-center flex flex-col items-center mx-auto max-w-lg mb-16">
				<Typography variant="h2">Reviews</Typography>
				<Divider />
				<div>
					For our company, customer feedback is of great importance, they are key tools in
					finding ways to improve and develop our services.
				</div>
			</div>
			<div className="reviews">
				<Slider
					infinite={true}
					speed={1800}
					centerMode={true}
					variableWidth={true}
					autoplay={true}
					autoplaySpeed={3000}
					arrows={false}
					draggable={true}
				>
					{appReviews.map((review, index) => (
						<AppReviewCard key={index} review={review} />
					))}
				</Slider>
			</div>
		</div>
	);
};

const AppReviewCard: React.FC<{ review: Review }> = ({ review }) => {
	return (
		<div className="bg-accent p-4 mx-4 max-w-lg min-w-96 rounded-lg">
			<div className="rating mb-5">
				<RatingStars maxRating={5} rating={review.rate} size={12} />
			</div>
			<div className="quote-mark mb-1">
				<QuoteMark />
			</div>
			<div className="review text-sm break-words mb-10 leading-snug">"{review.review}"</div>
			<div className="name font-semibold text-left">{review.name}</div>
		</div>
	);
};

export default AppReviews;
