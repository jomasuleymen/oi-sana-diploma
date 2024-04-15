import Container from "@components/ui/container";
import React from "react";
// @ts-ignore
import testometrika_widget from "@testometrika/widget";

type Props = {};

const TestsPage: React.FC<Props> = ({}) => {
	React.useEffect(() => {
		testometrika_widget.AutoInit();
		testometrika_widget.Test({
			key: "jgfafvre",
			auto_height: true,
			"data-height_initial": "700px",
		});
	}, []);

	return (
		<Container className="h-screen">
			<div className="testometrika_widget" id="jgfafvre"></div>
		</Container>
	);
};

export default TestsPage;
