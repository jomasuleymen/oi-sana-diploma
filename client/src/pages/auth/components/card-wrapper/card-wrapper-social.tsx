import { buttonVariants } from "@components/ui/button";
import { cn } from "@utils/utils";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { getOAuthLink } from "../../auth.service";

const SocialButton: React.FC<React.ComponentProps<"a"> & { provider: "google" | "twitter" }> = ({
	children,
	provider,
	...props
}) => (
	<a
		href={getOAuthLink(provider)}
		className={cn(buttonVariants({ variant: "outline-2" }), "flex-1 space-x-1 cursor-pointer")}
		{...props}
	>
		{children}
	</a>
);

const Social = () => {
	const searchParams = useParams();
	const callbackUrl = searchParams.callbackUrl;

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
				<SocialButton provider="google">
					<FcGoogle size={17} />
					<span>Google</span>
				</SocialButton>
				<SocialButton provider="twitter">
					<RiTwitterXFill size={17} />
					<span>Twitter</span>
				</SocialButton>
			</div>
		</div>
	);
};

export default Social;
