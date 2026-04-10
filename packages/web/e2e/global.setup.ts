/**
 * Global setup: save empty auth state.
 * Auth pages are disabled pre-launch (redirected to homepage).
 * Auth-dependent tests are skipped until sign-in/sign-up are re-enabled.
 */

import { test as setup } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const AUTH_FILE = path.join(__dirname, ".auth/user.json");

setup("setup", async () => {
  await mkdir(path.dirname(AUTH_FILE), { recursive: true });
  await writeFile(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }));
});
