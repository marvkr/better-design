/**
 * Tests for /api/claim-bonus
 *
 * Coverage:
 *  - POST / — success, already claimed, not authenticated, user not found
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { TEST_USER, TEST_SESSION, makeRequest, createTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

let mockUser: Record<string, unknown> | null = { ...TEST_USER, bonusClaimed: false };
let mockUsageRecord: { points: number; key: string } | null = { points: 2, key: TEST_USER.id };

vi.mock("@/db", () => ({
  db: {
    query: {
      user: {
        findFirst: vi.fn(async () => mockUser),
      },
      usage: {
        findFirst: vi.fn(async () => mockUsageRecord),
      },
    },
    update: vi.fn(() => ({
      set: vi.fn(() => ({ where: vi.fn(() => Promise.resolve()) })),
    })),
  },
  user: {},
  usage: {},
}));

vi.mock("@/lib/alerts", () => ({
  alertBonusClaimed: vi.fn(async () => {}),
}));

vi.mock("@/lib/posthog", () => ({
  getPostHog: vi.fn(() => ({
    capture: vi.fn(),
  })),
}));

let app: Hono;
let sessionState: typeof TEST_SESSION | null = TEST_SESSION;

beforeAll(async () => {
  const { default: claimBonusRoute } = await import("@/server/api/routes/claim-bonus");
  app = createTestApp("/claim-bonus", claimBonusRoute as unknown as Hono, () => sessionState);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /claim-bonus", () => {
  it("returns success and bonus credits on first claim", async () => {
    sessionState = TEST_SESSION;
    mockUser = { ...TEST_USER, bonusClaimed: false };
    mockUsageRecord = { points: 2, key: TEST_USER.id };

    const res = await app.request(makeRequest("POST", "/claim-bonus"));
    expect(res.status).toBe(200);
    const body = await res.json() as { success: boolean; bonusCredits: number };
    expect(body.success).toBe(true);
    expect(body.bonusCredits).toBe(3);
  });

  it("returns alreadyClaimed if bonus was already claimed", async () => {
    sessionState = TEST_SESSION;
    mockUser = { ...TEST_USER, bonusClaimed: true };

    const res = await app.request(makeRequest("POST", "/claim-bonus"));
    expect(res.status).toBe(200);
    const body = await res.json() as { alreadyClaimed: boolean };
    expect(body.alreadyClaimed).toBe(true);
  });

  it("returns 404 when user not found in DB", async () => {
    sessionState = TEST_SESSION;
    mockUser = null;

    const res = await app.request(makeRequest("POST", "/claim-bonus"));
    expect(res.status).toBe(404);
  });

  it("returns 401 when not authenticated", async () => {
    sessionState = null;
    const res = await app.request(makeRequest("POST", "/claim-bonus"));
    expect(res.status).toBe(401);
    sessionState = TEST_SESSION;
  });
});
