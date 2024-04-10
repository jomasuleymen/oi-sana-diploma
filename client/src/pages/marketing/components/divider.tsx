import { cn } from "@utils/utils";

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
	<hr className={cn("divider w-7 border-t-2 border-primary my-4", className)}></hr>
);
