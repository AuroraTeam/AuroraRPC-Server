import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    target: "node16",
    sourcemap: true,
    minify: true,
    clean: true,
    dts: true,
});
