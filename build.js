import { build } from "esbuild";
import { cp, rm } from "fs/promises";

await rm("build", { recursive: true, force: true });

await build({
	entryPoints: ["src/index.js"],
	bundle: true,
	format: "esm",
	minify: true,
	outdir: "build",
});

await cp("public", "build", { recursive: true });
