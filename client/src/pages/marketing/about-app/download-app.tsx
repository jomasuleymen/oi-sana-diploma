import Typography from "@components/ui/typography";
import React from "react";
import appMockUp from "/download-app.svg?url";
import appQr from "/download-qr.png?url";
import appApple from "/download-apple.png?url";
import { Card } from "@components/ui/card";

type Props = {};

const DownloadApp: React.FC<Props> = ({}) => {
	return (
		<div className="max-w-5xl flex gap-40 justify-center mx-auto">
			<div className="phone">
				<img
					src={appMockUp}
					alt="download-v4-tab-lite"
					className="m-0 min-w-0 w-auto max-w-full h-full"
				/>
			</div>
			<div className="qr flex-1 w-min">
				<Typography variant="h1" className="mb-14 font-semibold">
					Download the app
				</Typography>
				<div className="flex items-center mx-auto">
					<div className="w-40 h-40">
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
