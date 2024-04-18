import clsx, { ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { AuthPanel } from "./components/panels";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

import "./auth.style.scss";

const FormContainer = ({
	className,
	children,
}: {
	className?: ClassValue;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={clsx(
				"form-container flex items-center justify-center overflow-visible absolute top-0",
				className
			)}
		>
			{children}
		</div>
	);
};

const AuthPage = () => {
	const [isSignupMode, setIsSignUpMode] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [isSignupMode]);

	return (
		<>
			<div
				id="auth_container"
				className="w-full h-full relative flex justify-center md:items-center mt-4"
			>
				<FormContainer
					className={clsx("sign-in-container", {
						hide: isSignupMode,
						show: !isSignupMode,
					})}
				>
					<AuthPanel
						mode="signup"
						title="Don't have an account?"
						onClick={() => setIsSignUpMode(true)}
						className="-mr-[2px]"
					/>
					<LoginForm />
				</FormContainer>
				<FormContainer
					className={clsx("sign-up-container", {
						hide: !isSignupMode,
						show: isSignupMode,
					})}
				>
					<RegisterForm />
					<AuthPanel
						mode="signin"
						title="Already a member?"
						onClick={() => setIsSignUpMode(false)}
						className="-ml-[2px]"
					/>
				</FormContainer>
			</div>
		</>
	);
};

export default AuthPage;
