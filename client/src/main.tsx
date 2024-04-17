import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "plyr-react/plyr.css";

import App from "./App";
import "@/styles/global.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
