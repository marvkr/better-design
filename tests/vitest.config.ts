import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@/lib/utils": fileURLToPath(new URL("./lib/utils.ts", import.meta.url)),
      // The sources under test live outside this package, so their bare
      // imports would otherwise search for a node_modules that does not exist.
      react: fileURLToPath(new URL("./node_modules/react", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./setup.ts"],
    include: ["transitions/**/*.test.tsx"],
  },
})
