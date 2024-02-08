import { Button } from "@components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

const SocialButton: React.FC<React.ComponentProps<typeof Button>> = ({ children, ...props }) => (
	<Button variant="outline" className="flex-1 space-x-1" {...props}>
		{children}
	</Button>
);

const Social = () => {
	const searchParams = useParams();
	const callbackUrl = searchParams.callbackUrl;
	const onClick = (provider: "google" | "twitter") => {
		console.log("Logging using", provider);
		// login(provider, {
		// 	callbackUrl: callbackUrl || "/",
		// });
	};

	return (
		<div className="bottom w-full px-2">
			<div className="relative mb-2">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="flex gap-2">
				<SocialButton onClick={() => onClick("google")}>
					<FcGoogle size={17} />
					<span>Google</span>
				</SocialButton>
				<SocialButton onClick={() => onClick("twitter")}>
					<RiTwitterXFill size={17} />
					<span>Twitter</span>
				</SocialButton>
			</div>
		</div>
	);
};

export default Social;
