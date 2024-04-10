import { LoaderIcon } from "lucide-react";
import React from "react";

type Props = {};

const Loading: React.FC<Props> = ({}) => {
	return (
		<div className="w-full flex items-center flex-col gap-1 justify-center py-5">
			<LoaderIcon className="animate-spin text-primary font-semibold" />
			Loading...
		</div>
	);
};

export default Loading;
