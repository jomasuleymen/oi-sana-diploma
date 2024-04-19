import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/use-auth";
import { socket } from "@lib/socket";
import { generateRoomToken } from "@pages/call/call.service";
import { useVideoStore } from "@pages/call/store/video.store";
import { User } from "@pages/main/user/user.service";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "../chat.types";

interface ChatTopbarProps {
	room: Room;
	selectedUser: Pick<User, "id" | "username" | "profileImage">;
}

export default function ChatTopbar({ selectedUser, room }: ChatTopbarProps) {
	const [videoRooms] = useVideoStore((store) => [store.videoRooms]);
	const [videoOpened, setVideoOpened] = useState<boolean>(false);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const videoOpened = videoRooms.includes(room.id);
		setVideoOpened(videoOpened);
	}, [room, videoRooms]);

	const handleVideoCall = () => {
		socket.emit("create-video-room", { roomId: room.id });
	};

	const handleJoinRoom = () => {
		generateRoomToken(room.id).then((data) => {
			navigate(`/call/video?roomId=${data.roomId}&token=${data.token}`);
		});
	};

	const handleCloseRoom = () => {
		socket.emit("close-video-room", { roomId: room.id });
	};

	return (
		<div className="w-full h-20 flex p-4 justify-between items-center border-b">
			<div className="flex items-center gap-2">
				<AvatarWrapper
					className="flex justify-center items-center"
					src={selectedUser.profileImage}
					username={selectedUser.username}
				/>
				<div className="flex flex-col">
					<span className="font-medium">{selectedUser.username}</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				{videoOpened && (
					<div className="flex gap-2">
						<Button variant="outline-2" className="px-3" onClick={handleJoinRoom}>
							Join room
						</Button>
						{user?.isSpecialist && (
							<Button
								variant="outline-2"
								className="px-3 border-red-500 text-red-500"
								onClick={handleCloseRoom}
							>
								Close room
							</Button>
						)}
					</div>
				)}
				{!videoOpened && user?.isSpecialist && (
					<Button variant="outline-2" className="px-3" onClick={handleVideoCall}>
						<Video size={18} />
					</Button>
				)}
			</div>
		</div>
	);
}
