import * as React from "react";

import { cn } from "@utils/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, icon: Icon, type, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex h-10 items-center rounded-md border border-input bg-background pl-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
					className
				)}
			>
				{Icon && <Icon className="h-4 w-4" />}
				<input
					type={type}
					className={cn(
						"w-full p-2 placeholder:text-muted-foreground bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
