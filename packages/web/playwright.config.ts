import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3001";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false, // keep sequential — tests share DB state
  retries: 0,
  reporter: "list",

  use: {
    baseURL: BASE_URL,
    permissions: ["clipboard-read", "clipboard-write"],
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    // 1. Global setup: sign up / sign in once, save auth state to disk
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    // 2. All E2E tests run with the saved auth state
    {
      name: "e2e",
      testMatch: /\.test\.ts$/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/user.json",
      },
    },
  ],

  // Start the Next.js dev server automatically if not already running
  webServer: {
    command: "bun run dev:next",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
