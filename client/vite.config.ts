import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		viteCompression({
			algorithm: "gzip",
			deleteOriginFile: false,
			compressionOptions: {
				level: 5,
			},
			verbose: false,
		}),
	],
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
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler", // or "modern", "legacy"
			},
		},
	},
});
