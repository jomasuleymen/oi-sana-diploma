import Container from "@components/ui/container";
import React from "react";
import { testsData } from "./test-data";
import { Card } from "@components/ui/card";
import { Link } from "react-router-dom";

type Props = {};

const TestsPage: React.FC<Props> = ({}) => {
	return (
		<Container className="grid grid-cols-2 gap-4 mt-4" transparent>
			{testsData.map((test, index) => (
				<Link key={index} to={`/tests/${test.code}`}>
					<Card className="flex items-center p-4 gap-8">
						<div className="w-20 h-20">
							<img src={test.image} alt={test.title} />
						</div>
						<div className="text-gray-600 font-medium leading-4">{test.title}</div>
					</Card>
				</Link>
			))}
		</Container>
	);
};

export default TestsPage;
