import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createRoot } from "react-dom/client";

import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<App />
		</NextThemesProvider>
	</QueryClientProvider>
);
