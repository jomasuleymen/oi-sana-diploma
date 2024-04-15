import { memo } from "react";
import { Outlet } from "react-router-dom";

const CallLayout: React.FC = memo(() => {
	return (
		<>
			<div className="flex flex-col h-screen !overflow-hidden">
				<div className="flex flex-1 !overflow-hidden">
					<main className="flex-1 overflow-y-auto paragraph">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
});

export default CallLayout;
