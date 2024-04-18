import { isURL } from "@utils/utils";
import React, { memo } from "react";

const ServerImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...props }) => {
	if (!src) return null;
	if (isURL(src)) {
		return <img src={src} {...props} />;
	}

	return <img src={import.meta.env.VITE_SERVER_URL + "/uploads/" + src} {...props} />;
};

export default memo(ServerImage);
