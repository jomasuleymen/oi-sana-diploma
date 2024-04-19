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
		<div className="banner min-h-screen -mt-16 flex flex-col">
			<div className="flex-1 pb-4 -mb-1 pt-16 flex items-center flex-col bg-primary justify-center text-white">
				<h1 className="scroll-m-20 font-semibold tracking-tight text-5xl pb-6 text-center">
					Oi-Sana
				</h1>
				<h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
					“Oi-Sana” - a platform for tracking and improving mental health
				</h3>
				<div className="flex flex-wrap justify-center items-center gap-3 mt-12">
					<Link to="/auth">
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
					<Link to="/auth/specialist">
						<ClientTypeCard $image={SpecialistImage} $bgColor="#fea1bc">
							<CardHeader>
								<CardTitle>Specialist</CardTitle>
								<CardDescription>I am specialist</CardDescription>
							</CardHeader>
							<CardFooter className="flex justify-between"></CardFooter>
						</ClientTypeCard>
					</Link>
				</div>
			</div>
			<svg
				id="wave"
				style={{
					transform: "rotate(180deg)",
				}}
				viewBox="0 0 1440 80"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					style={{
						marginTop: "-2px",
						transform: "translate(0, 0px)",
					}}
					fill="#9999FF"
					d="M0,80L48,71.7C96,63,192,47,288,40C384,33,480,37,576,46.7C672,57,768,73,864,71.7C960,70,1056,50,1152,48.3C1248,47,1344,63,1440,70C1536,77,1632,73,1728,63.3C1824,53,1920,37,2016,28.3C2112,20,2208,20,2304,25C2400,30,2496,40,2592,51.7C2688,63,2784,77,2880,71.7C2976,67,3072,43,3168,43.3C3264,43,3360,67,3456,78.3C3552,90,3648,90,3744,80C3840,70,3936,50,4032,46.7C4128,43,4224,57,4320,53.3C4416,50,4512,30,4608,30C4704,30,4800,50,4896,48.3C4992,47,5088,23,5184,16.7C5280,10,5376,20,5472,25C5568,30,5664,30,5760,33.3C5856,37,5952,43,6048,53.3C6144,63,6240,77,6336,78.3C6432,80,6528,70,6624,66.7C6720,63,6816,67,6864,68.3L6912,70L6912,100L6864,100C6816,100,6720,100,6624,100C6528,100,6432,100,6336,100C6240,100,6144,100,6048,100C5952,100,5856,100,5760,100C5664,100,5568,100,5472,100C5376,100,5280,100,5184,100C5088,100,4992,100,4896,100C4800,100,4704,100,4608,100C4512,100,4416,100,4320,100C4224,100,4128,100,4032,100C3936,100,3840,100,3744,100C3648,100,3552,100,3456,100C3360,100,3264,100,3168,100C3072,100,2976,100,2880,100C2784,100,2688,100,2592,100C2496,100,2400,100,2304,100C2208,100,2112,100,2016,100C1920,100,1824,100,1728,100C1632,100,1536,100,1440,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
				></path>
			</svg>
		</div>
	);
};

export default Banner;
