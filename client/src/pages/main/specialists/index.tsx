import Container from "@components/ui/container";
import { Input } from "@components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import SpecialistsListPage from "./components/specialists-list";
import { useDebounce } from "@hooks/use-debounce";

type Props = {};

const SpecialistsPage: React.FC<Props> = ({}) => {
	const [search, setSearch] = React.useState<string>("");
	const debouncedSearch = useDebounce(search, 700);

	return (
		<>
			<Container transparent className="mb-4">
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
				<SpecialistsListPage search={debouncedSearch} />
			</Container>
		</>
	);
};

export default SpecialistsPage;
