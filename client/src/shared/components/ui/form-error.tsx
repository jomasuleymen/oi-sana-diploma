import { FaExclamationTriangle } from "react-icons/fa";

interface ValidationError {
	property: string;
	constraints: string[];
}

export interface FormErrorProps {
	message: string;
	validationErrors?: ValidationError[];
}

export const FormError = ({ message, validationErrors }: FormErrorProps) => {
	const errors: string[] = [];

	if (validationErrors) {
		validationErrors.forEach((error) => {
			errors.push(error.constraints.join(", "));
		});
	} else if (message) {
		errors.push(message);
	}

	if (!errors.length) return null;

	return (
		<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<FaExclamationTriangle className="min-h-4 min-w-4" />
			{errors.map((message, index) => (
				<p key={index}>{message}</p>
			))}
		</div>
	);
};
