import RatingStars from "@components/stars";
import Typography from "@components/ui/typography";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import SpecialistReviewCard from "./specialist-review";
import { specialistReviews } from "./reviews";

const MarketingSpecialists: React.FC = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="top flex flex-col gap-3 items-center justify-center">
				<div className="stars">
					<RatingStars maxRating={5} rating={5} size={32} />
				</div>
				<Typography variant="h2">More than 60,000 5-star reviews</Typography>
			</div>
			<div className="overflow-hidden">
				<Slider
					infinite={true}
					speed={1800}
					slidesToShow={1}
					centerMode={true}
					variableWidth={true}
					autoplay={true}
					autoplaySpeed={3500}
					arrows={false}
					draggable={false}
				>
					{specialistReviews.map((review, index) => (
						<SpecialistReviewCard
							key={index}
							review={review}
							reverse={index % 2 === 0}
							colorIndex={index}
						/>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default MarketingSpecialists;
