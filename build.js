// eslint-disable-next-line @typescript-eslint/no-var-requires
const { build } = require("esbuild");

(async () => {
    console.log("Build...");
    console.time("Build successfully");

    await Promise.all(
        [
            {
                format: "cjs",
                outfile: "dist/node.cjs",
            },
            {
                format: "esm",
                outfile: "dist/node.mjs",
            },
        ].map(async (config) => {
            await build({
                platform: "node",
                entryPoints: ["src/index.ts"],
                bundle: true,
                minify: true,
                sourcemap: true,
                ...config,
            }).catch(() => process.exit(1));
        })
    );

    console.timeEnd("Build successfully");
})();
