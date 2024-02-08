import { Card, CardContent, CardFooter } from "@components/ui/card";
import CardWrapperHeader, {
  CardWrapperHeaderProps,
} from "./card-wrapper-header";
import Social from "./card-wrapper-social";
import { cn } from "@utils/tailwind.utils";
import { ClassValue } from "clsx";

interface CardWrapperProps {
  headerProps: CardWrapperHeaderProps;
  showSocial?: boolean;
  children: React.ReactNode;

  className?: ClassValue;
}

export const CardWrapper = ({
  children,
  headerProps,
  showSocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("min-w-max px-4 py-6 flex flex-col items-center justify-center", className)}>
      <CardWrapperHeader {...headerProps} />
      <CardContent className="p-2 w-full">{children}</CardContent>
      {showSocial && (
        <CardFooter className="p-2 w-full">
          <Social />
        </CardFooter>
      )}
    </Card>
  );
};
