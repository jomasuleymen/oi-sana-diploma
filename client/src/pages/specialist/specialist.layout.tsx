import { memo } from "react";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";

const SpecialistsLayout: React.FC = memo(() => {
	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-16">
				<CustomOutlet />
			</main>
		</>
	);
});

export default SpecialistsLayout;
