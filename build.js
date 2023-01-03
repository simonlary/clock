import { build } from "esbuild";
import { cp, rm } from "fs/promises";

await rm("build", { recursive: true, force: true });

await build({
	entryPoints: ["src/index.js"],
	outdir: "build",
	bundle: true,
	minify: true,
	format: "esm",
});

await cp("public", "build", { recursive: true });
