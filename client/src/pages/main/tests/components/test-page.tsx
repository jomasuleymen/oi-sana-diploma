import Container from "@components/ui/container";
import React, { useEffect } from "react";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/utils";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// @ts-ignore
import testometrika_widget from "@testometrika/widget";

const TestPage: React.FC = () => {
	const { code } = useParams();

	useEffect(() => {
		if (code) {
			testometrika_widget.AutoInit();
			testometrika_widget.Test({
				key: code,
				auto_height: false,
				height_initial: "700px",
			});
		}
	}, [code]);

	return (
		<Container className="p-0" transparent>
			<div className="mb-4 flex">
				<Link
					to="/tests"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"hidden md:flex items-center p-0"
					)}
				>
					<ChevronLeft className="mr-2 h-4 w-4 align-middle" />
					See all tests
				</Link>
			</div>
			<Container className="h-[700px]">
				<div className="testometrika_widget" id={code}></div>
			</Container>
		</Container>
	);
};

export default TestPage;
