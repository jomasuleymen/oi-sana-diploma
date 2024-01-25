import { SignInPanel, SignUpPanel } from "@/components/auth/panels";
import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import clsx, { ClassValue } from "clsx";
import { useEffect, useState } from "react";

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
        "form-container flex items-center justify-center overflow-hidden md:overflow-visible",
        className
      )}
    >
      {children}
    </div>
  );
};

const AuthPage = () => {
  const [isSignupMode, setIsSignUpMode] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSignupMode]);

  return (
    <div
      id="auth_container"
      className="w-full h-full relative flex justify-center md:items-center md:my-10"
    >
      <FormContainer
        className={clsx("sign-in-container", {
          hide: isSignupMode,
          show: !isSignupMode,
        })}
      >
        <SignUpPanel setIsSignUpMode={setIsSignUpMode} />
        <LoginForm />
      </FormContainer>
      <FormContainer
        className={clsx("sign-up-container", {
          hide: !isSignupMode,
          show: isSignupMode,
        })}
      >
        <RegisterForm />
        <SignInPanel setIsSignUpMode={setIsSignUpMode} />
      </FormContainer>
    </div>
  );
};

export default AuthPage;
