import { useAuth } from "@hooks/use-auth";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// @ts-ignore
import { ZegoUIKitPrebuiltCall } from "@zegocloud/zego-uikit-prebuilt-call-rn";

function VideoCallPage() {
	const navigate = useNavigate();
	const { user, loading: userLoading } = useAuth();
	const [searchParams, _] = useSearchParams();
	const ref = useRef(null);

	const token = "a3b32455f70b0d1aaa75fedbfe0e0abf" || searchParams.get("token");
	const roomId = searchParams.get("roomId");

	useEffect(() => {
		if (userLoading) return;

		if (!roomId || !token || !user) {
			return;
		}

		const appID = 146140608;
		const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
			appID,
			token,
			roomId,
			user.id.toString(),
			user.username
		);

		const zp = ZegoUIKitPrebuilt.create(kitToken);
		zp.joinRoom({
			container: ref.current,
			turnOnMicrophoneWhenJoining: true,
			turnOnCameraWhenJoining: true,
			showMyCameraToggleButton: true,
			showMyMicrophoneToggleButton: true,
			showAudioVideoSettingsButton: true,
			showScreenSharingButton: false,
			showTextChat: true,
			showUserList: true,
			maxUsers: 2,
			onReturnToHomeScreenClicked: () => {
				zp.destroy();
				navigate("/chat");
			},
			layout: "Auto",
			showLayoutButton: false,
			scenario: {
				mode: ZegoUIKitPrebuilt.OneONoneCall,
			},
		});

		return () => {
			if (zp) {
				zp.destroy();
			}
		};
	}, [ref, roomId, token, user, userLoading, navigate]);

	return <div ref={ref} style={{ width: "100%", height: "100vh" }}></div>;
}

export default VideoCallPage;
