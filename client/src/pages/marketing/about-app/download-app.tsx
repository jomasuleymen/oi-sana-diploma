import { Card } from "@components/ui/card";
import Typography from "@components/ui/typography";
import React from "react";
import appMockUp from "/app-mock-up.png?url";
import appApple from "/download-apple.png?url";
import appQr from "/download-qr.png?url";

const DownloadApp: React.FC = ({}) => {
	return (
		<div className="max-w-5xl flex gap-40 justify-center mx-auto">
			<div className="phone">
				<div className="w-[300px] h-[554px]">
					<img src={appMockUp} alt="download-v4-tab-lite" className="w-full h-full" />
				</div>
			</div>
			<div className="qr flex-1 w-min">
				<Typography variant="h1" className="mb-14 font-semibold">
					Download the app
				</Typography>
				<div className="flex items-center mx-auto">
					<div className="w-48 h-48">
						<Card className="qr overflow-hidden mb-2">
							<img src={appQr} alt="download-qr" className="border-none" />
						</Card>
						<Card>
							<a href="https://apps.apple.com/us/app/google/id284815942">
								<img src={appApple} alt="app-apple" />
							</a>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DownloadApp;
