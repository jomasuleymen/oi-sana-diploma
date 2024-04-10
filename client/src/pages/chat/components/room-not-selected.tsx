import React from "react";
import logo from "/logo-with-text.svg?url";

const RoomNotSelected: React.FC = () => {
	return (
		<div className="flex justify-center items-center flex-col w-full h-full select-none">
			<img src={logo} alt="Chat" className="w-72" />
			<h1 className="text-3xl font-bold text-center mt-6 text-primary">Select a room to start chatting</h1>
		</div>
	);
};

export default RoomNotSelected;
