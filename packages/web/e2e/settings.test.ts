/**
 * E2E tests for /settings — API key management UI
 *
 * Journey:
 *  1. Navigate to /settings (auth-gated)
 *  2. Create an API key via the UI dialog
 *  3. Copy the key (verify it has bd_live_ prefix)
 *  4. Dismiss the dialog — verify the key appears in the list
 *  5. Revoke the key — verify it disappears from the list
 *
 * Runs against the real Next.js server + real Postgres DB.
 */

import { test, expect } from "@playwright/test";

// Auth pages disabled pre-launch — re-enable when sign-in/sign-up are restored
test.describe.skip("Settings — API keys UI", () => {
  test("redirects unauthenticated users to /sign-in", async ({ browser }) => {
    // Use a fresh context with no auth state
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();

    await page.goto("/settings");
    await expect(page).toHaveURL(/sign-in/, { timeout: 10_000 });

    await ctx.close();
  });

  test("loads the settings page for authenticated user", async ({ page }) => {
    await page.goto("/settings");
    await expect(page).toHaveURL("/settings");
    await expect(page.getByRole("heading", { name: /settings/i })).toBeVisible();
    await expect(page.getByText("API Keys", { exact: true })).toBeVisible();
  });

  test("shows empty state when no keys exist", async ({ page }) => {
    await page.goto("/settings");
    const emptyState = page.getByText("No API keys yet");
    const keyRow = page.locator("[data-testid='api-key-row']").first();

    await expect(emptyState.or(keyRow)).toBeVisible();
  });

  test("full lifecycle: create key → copy it → see it in list → revoke it", async ({ page }) => {
    await page.goto("/settings");

    const createDialog = page.getByRole("dialog");
    await page.getByRole("button", { name: /new key/i }).click();
    await expect(createDialog).toBeVisible();
    await expect(createDialog.getByText(/create api key/i)).toBeVisible();

    const keyName = `E2E Test Key ${Date.now()}`;
    await createDialog.getByLabel(/key name/i).fill(keyName);
    await createDialog.getByRole("button", { name: /create key/i }).click();

    await expect(createDialog.getByText(/copy this key now/i)).toBeVisible();

    const fullKey = await createDialog.getByLabel("Created API key").inputValue();
    expect(fullKey).toMatch(/^bd_live_[A-Za-z0-9]{32}$/);
    expect(fullKey).toHaveLength(40);

    const copyButton = createDialog.getByRole("button", { name: "Copy API key" });
    await copyButton.click();
    await expect(createDialog.getByRole("button", { name: "API key copied" })).toBeVisible();

    await createDialog.getByRole("button", { name: /done/i }).click();
    await expect(createDialog).not.toBeVisible();

    const keyRow = page.locator("[data-testid='api-key-row']").filter({ hasText: keyName });
    await expect(keyRow).toHaveCount(1);
    await expect(keyRow.getByText(/active/i)).toBeVisible();

    await page.getByRole("button", { name: `Actions for ${keyName}` }).click();
    await page.getByRole("menuitem", { name: /revoke/i }).click();

    const revokeDialog = page.getByRole("dialog");
    await expect(revokeDialog).toBeVisible();
    await expect(revokeDialog.getByText(/revoke api key/i)).toBeVisible();
    await revokeDialog.getByRole("button", { name: /revoke key/i }).click();

    await expect(page.locator("[data-testid='api-key-row']").filter({ hasText: keyName })).toHaveCount(0);
  });
});
