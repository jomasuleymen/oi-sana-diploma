import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { useHeaderMode } from "@hooks/use-header-mode";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SpecialistImage from "/undraw_certificate_re_yadi.svg?url";

const ClientTypeCard = styled(Card)<{ $bgColor: string; $image: string }>`
	width: 290px;
	height: 218px;
	border: none;
	border: 1px solid transparent;

	&:hover {
		border: 1px solid white;
	}

	background-color: ${({ $bgColor }) => $bgColor};
	background-image: url(${({ $image }) => $image});
	background-size: 150px 150px;
	background-repeat: no-repeat;
	background-position: bottom right;

	* {
		color: white;
	}
`;

const Banner: React.FC = () => {
	useHeaderMode("transparent", 40);

	return (
		<div className="banner h-full px-2 pb-6 -mt-16 pt-48 flex items-center justify-start flex-col text-white">
			<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl pb-6 text-center">
				Oi-Sana
			</h1>
			<h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
				Платформа для отслеживания и улучшения ментального здоровья
			</h3>
			<div className="flex flex-wrap justify-center items-center gap-3 mt-12">
				<Link to="/home">
					<ClientTypeCard $image={SpecialistImage} $bgColor="#FCBD2D">
						<CardHeader>
							<CardTitle>Client</CardTitle>
							<CardDescription className="font-semibold">
								I need specialist
							</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-between"></CardFooter>
					</ClientTypeCard>
				</Link>
				<ClientTypeCard $image={SpecialistImage} $bgColor="#fea1bc">
					<CardHeader>
						<CardTitle>Specialist</CardTitle>
						<CardDescription>I am specialist</CardDescription>
					</CardHeader>
					<CardFooter className="flex justify-between"></CardFooter>
				</ClientTypeCard>
			</div>
		</div>
	);
};

export default Banner;
