import React from "react";

import { GlobalLoading } from "react-global-loading";
import logo from "/colored-logo.png?url";

const ScreenLoading: React.FC = () => {
	return (
		<GlobalLoading backgroundColor="rgba(193, 193, 247, 0.3)">
			<img src={logo} width={50} height={50} alt="logo" className="animate-bounce" />
		</GlobalLoading>
	);
};

export default ScreenLoading;
