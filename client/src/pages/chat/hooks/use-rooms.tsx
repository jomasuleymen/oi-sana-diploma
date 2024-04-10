import { useEffect, useState } from "react";
import { Room } from "../chat.types";
import { fetchRooms } from "../chat.service";

export const useRooms = () => {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		fetchRooms().then((res) => {
			setRooms(res);
		});
	}, [setRooms]);

	return rooms;
};
