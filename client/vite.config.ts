import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	build: {
		emptyOutDir: true,
		outDir: "../server/client",
	},
	assetsInclude: ["**/*.svg"],
	resolve: {
		alias: {
			// for TypeScript path alias import like : @/x/y/z
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
