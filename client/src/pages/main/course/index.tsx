import Container from "@components/ui/container";
import { Input } from "@components/ui/input";
import { useDebounce } from "@hooks/use-debounce";
import { Search } from "lucide-react";
import React from "react";
import CoursesListPage from "./components/course-list";

type Props = {
	myEnrolledCourses?: boolean;
};

const CoursesPage: React.FC<Props> = ({ myEnrolledCourses }) => {
	const [search, setSearch] = React.useState<string>("");
	const debouncedSearch = useDebounce(search, 700);

	return (
		<>
			<Container className="mb-4">
				<div className="flex gap-2 items-center max-w-56">
					<Input
						placeholder="Search by name"
						className="w-full"
						type="search"
						icon={Search}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</Container>
			<Container transparent>
				<CoursesListPage search={debouncedSearch} myEnrolledCourses={myEnrolledCourses} />
			</Container>
		</>
	);
};

export default CoursesPage;
