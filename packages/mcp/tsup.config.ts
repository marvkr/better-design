import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  outDir: "dist",
  clean: true,
  splitting: false,
  sourcemap: true,
  // Bundle @better-design/shared into the output so npm users
  // don't need the private workspace package.
  noExternal: ["@better-design/shared"],
  banner: {
    js: "#!/usr/bin/env node",
  },
});
