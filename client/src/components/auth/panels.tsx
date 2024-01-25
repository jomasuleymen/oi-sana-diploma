import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

type PanelProps = {
  mode: "signin" | "signup";
  title: string;
  onClick: any;
};

const Panel: React.FC<PanelProps> = ({ mode, title, onClick }) => {
  const isSignup = mode === "signup";

  return (
    <Card
      className={clsx(
        "panel",
        isSignup ? "sign-up-panel" : "sign-in-panel"
      )}
    >
      <CardHeader>
        <CardTitle className="text-base mb-6 flex gap-2">
          <p className="font-normal">{title}</p>
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={onClick}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={`auth/${isSignup ? "signup" : "signin"}.svg`}
          className="panel-image"
        />
      </CardContent>
    </Card>
  );
};

type SidePanelProps = {
  setIsSignUpMode: (isSignUpMode: boolean) => void;
};

export const SignInPanel: React.FC<SidePanelProps> = ({ setIsSignUpMode }) => {
  return (
    <Panel
      mode="signin"
      title="Already a member?"
      onClick={() => setIsSignUpMode(false)}
    />
  );
};

export const SignUpPanel: React.FC<SidePanelProps> = ({ setIsSignUpMode }) => {
  return (
    <Panel
      mode="signup"
      title="Don't have an account?"
      onClick={() => setIsSignUpMode(true)}
    />
  );
};
