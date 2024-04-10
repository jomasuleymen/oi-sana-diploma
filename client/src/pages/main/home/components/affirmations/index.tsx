import React from "react";
import Slider from "react-slick";
import { useAffirmations } from "../../hooks/use-affirmations";

import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import styled from "styled-components";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loading from "@components/loading";

type Props = {};

const CustomDiv = styled.div`
	margin-bottom: 50px;

	.slick-dots {
		bottom: -40px;
		& button:before {
			font-size: 10px;
		}
	}
`;

const Affirmations: React.FC<Props> = ({}) => {
	const { isLoading, items: affirmations } = useAffirmations();

	if (isLoading) return <Loading />;

	return (
		<CustomDiv>
			<div className="max-w-[700px] mx-auto">
				<Typography variant="h1" className="text-center mb-8 break-words font-bold">
					Get the health answers you need from people who live it every day
				</Typography>
			</div>
			<div className="w-[620px] mx-auto md:w-[820px]">
				<Slider
					infinite={affirmations.length > 1}
					speed={1800}
					slidesToShow={1}
					slidesToScroll={1}
					autoplay={true}
					draggable={true}
					autoplaySpeed={3500}
					dots={true}
					arrows={true}
				>
					{affirmations.map((affirmation) => (
						<ServerImage
							src={affirmation.image}
							key={affirmation.id}
							className="w-[520px] h-[420px] mx-auto object-contain"
						/>
					))}
				</Slider>
			</div>
		</CustomDiv>
	);
};

export default Affirmations;
