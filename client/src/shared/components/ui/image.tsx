import React from "react";

const ServerImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...props }) => {
	return <img src={import.meta.env.VITE_SERVER_URL + "/uploads/" + src} {...props} />;
};

export default ServerImage;
