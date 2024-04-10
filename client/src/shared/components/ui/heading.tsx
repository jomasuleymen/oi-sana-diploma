import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface HeadingProps {
	title: string;
	description: string;
	addNewLink?: string;
	children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ title, description, addNewLink, children }) => {
	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex-1">
				<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<div className="flex gap-2 items-center">
				{children && children}
				{addNewLink && (
					<Link to={addNewLink}>
						<Button className="flex justify-center items-center">
							<Plus className="mr-2 h-4 w-4" /> Add New
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
};
