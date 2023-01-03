import { serve } from "esbuild";

await serve(
	{
		servedir: "public",
	},
	{
		entryPoints: ["src/index.js"],
		bundle: true,
		format: "esm",
		sourcemap: true,
	}
);
