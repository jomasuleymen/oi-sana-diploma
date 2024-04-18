import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import clsx from "clsx";

type PanelProps = {
	mode: "signin" | "signup";
	title: string;
	onClick: any;
	className?: string;
};

export const AuthPanel: React.FC<PanelProps> = ({ mode, title, onClick, className }) => {
	const isSignup = mode === "signup";

	return (
		<Card className={clsx("panel", isSignup ? "sign-up-panel" : "sign-in-panel", className)}>
			<CardHeader>
				<CardTitle className="text-base mb-6 flex gap-2">
					<p className="font-normal">{title}</p>
					<span className="text-blue-600 font-semibold cursor-pointer" onClick={onClick}>
						{isSignup ? "Sign up" : "Sign in"}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-72 h-72">
					<img
						src={`auth/${isSignup ? "signup" : "signin"}.svg`}
						className="panel-image w-full h-full"
					/>
				</div>
			</CardContent>
		</Card>
	);
};
