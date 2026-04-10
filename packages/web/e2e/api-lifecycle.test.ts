/**
 * E2E tests for the full API key lifecycle against real endpoints.
 *
 * Journey:
 *  1. Create a fresh API key via the settings UI
 *  2. Use the key against protected REST endpoints backed by the real DB
 *  3. Call without key → 401
 *  4. Revoke the key via the settings UI
 *  5. Use the revoked key → 401
 *
 * Avoids endpoints that require external embedding providers so it can run
 * against a local app + database without extra network dependencies.
 */

import { test, expect, type APIRequestContext, type Page } from "@playwright/test";

type ApiErrorResponse = { code: string };
type DesignSystemDetailsResponse = {
  metadata: { id: string; title: string };
  componentCount: number;
};
type DesignSystemComponentsResponse = {
  components: Array<{ name: string }>;
};
type PrinciplesResponse = {
  principles: Array<{ id: string; title: string }>;
};
type ReviewRulesResponse = {
  rules: Array<{ id: string; title: string }>;
};

const SEEDED_DESIGN_SYSTEM_IDS = ["stripe", "airbnb", "linear", "supabase"];

async function createApiKey(page: Page, keyName: string): Promise<string> {
  await page.goto("/settings");

  const createDialog = page.getByRole("dialog");
  await page.getByRole("button", { name: /new key/i }).click();
  await createDialog.getByLabel(/key name/i).fill(keyName);
  await createDialog.getByRole("button", { name: /create key/i }).click();

  await expect(createDialog.getByLabel("Created API key")).toBeVisible();
  const apiKey = await createDialog.getByLabel("Created API key").inputValue();
  await createDialog.getByRole("button", { name: /done/i }).click();

  return apiKey;
}

async function revokeApiKey(page: Page, keyName: string): Promise<void> {
  const row = page.locator("[data-testid='api-key-row']").filter({ hasText: keyName });
  await expect(row).toHaveCount(1);

  await page.getByRole("button", { name: `Actions for ${keyName}` }).click();
  await page.getByRole("menuitem", { name: /revoke key/i }).click();
  await page.getByRole("dialog").getByRole("button", { name: /revoke key/i }).click();

  await expect(page.locator("[data-testid='api-key-row']").filter({ hasText: keyName })).toHaveCount(0);
}

async function findAvailableDesignSystem(
  request: APIRequestContext,
  apiKey: string,
): Promise<DesignSystemDetailsResponse> {
  for (const id of SEEDED_DESIGN_SYSTEM_IDS) {
    const res = await request.get(`/api/v1/design-systems/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.status() === 200) {
      return await res.json() as DesignSystemDetailsResponse;
    }
  }

  throw new Error(`No seeded design system found. Tried: ${SEEDED_DESIGN_SYSTEM_IDS.join(", ")}`);
}

// Auth pages disabled pre-launch — re-enable when sign-in/sign-up are restored
test.describe.skip("API key lifecycle — real endpoints", () => {
  test("request without key returns 401", async ({ request }) => {
    const res = await request.get("/api/v1/review-rules");
    expect(res.status()).toBe(401);

    const body = await res.json() as ApiErrorResponse;
    expect(body.code).toBe("UNAUTHORIZED");
  });

  test("created key works across protected endpoints and stops working after revocation", async ({ page, request }) => {
    const keyName = `E2E Lifecycle ${Date.now()}`;
    const apiKey = await createApiKey(page, keyName);
    expect(apiKey).toMatch(/^bd_live_[A-Za-z0-9]{32}$/);

    const designSystem = await findAvailableDesignSystem(request, apiKey);
    expect(designSystem.metadata.id).toBeTruthy();
    expect(designSystem.metadata.title).toBeTruthy();
    expect(designSystem.componentCount).toBeGreaterThan(0);

    const componentsRes = await request.get(`/api/v1/design-systems/${designSystem.metadata.id}/components`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    expect(componentsRes.status()).toBe(200);

    const componentsBody = await componentsRes.json() as DesignSystemComponentsResponse;
    expect(componentsBody.components.length).toBeGreaterThan(0);

    const principlesRes = await request.get("/api/v1/principles", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    expect(principlesRes.status()).toBe(200);

    const principlesBody = await principlesRes.json() as PrinciplesResponse;
    expect(principlesBody.principles.length).toBeGreaterThan(0);
    expect(principlesBody.principles[0]?.id).toMatch(/^principle-/);

    const reviewRulesRes = await request.get("/api/v1/review-rules", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    expect(reviewRulesRes.status()).toBe(200);

    const reviewRulesBody = await reviewRulesRes.json() as ReviewRulesResponse;
    expect(reviewRulesBody.rules.length).toBeGreaterThan(0);
    expect(reviewRulesBody.rules[0]?.id).toMatch(/^review-/);

    await page.goto("/settings");
    await revokeApiKey(page, keyName);

    const revokedRes = await request.get(`/api/v1/design-systems/${designSystem.metadata.id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    expect(revokedRes.status()).toBe(401);

    const revokedBody = await revokedRes.json() as ApiErrorResponse;
    expect(revokedBody.code).toBe("UNAUTHORIZED");
  });
});
