/**
 * Tests for per-API-key rate limiting on /api/v1/ endpoints
 *
 * Coverage:
 *  - 429 when checkIPRateLimit returns allowed: false
 *  - Retry-After header is present on 429
 *  - Rate limiter is keyed by API key ID (not IP)
 *  - Requests pass through when allowed: true
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { makeRequest, withApiKey, sha256, VALID_KEY, createApiTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Mutable state for toggling rate limit in tests
// ---------------------------------------------------------------------------
let rateLimitAllowed = true;
let rateLimitRetryAfter = 0;
const rateLimitCalls: [string, string, number, number][] = [];

vi.mock("@/lib/ip-rate-limit", () => ({
  checkIPRateLimit: vi.fn(async (key: string, action: string, limit: number, windowMs: number) => {
    rateLimitCalls.push([key, action, limit, windowMs]);
    return { allowed: rateLimitAllowed, retryAfter: rateLimitRetryAfter };
  }),
}));

vi.mock("@/db", () => ({
  db: {
    query: {
      apiKeys: {
        findFirst: vi.fn(async () => ({
          id: "key_rl_test",
          userId: "user_123",
          keyHash: "", // patched in beforeAll
          keyPrefix: "bd_live_abcd...",
          lastUsedAt: null,
          revokedAt: null,
          createdAt: new Date(),
        })),
      },
    },
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: vi.fn(() => Promise.resolve()) })) })),
  },
  apiKeys: {},
  usage: {},
}));

vi.mock("@/lib/design-systems", () => ({
  searchDesignSystems: vi.fn(async () => []),
  getDesignSystemById: vi.fn(async () => null),
}));

vi.mock("@/lib/foundational-docs", () => ({
  listFoundationalDocs: vi.fn(async () => []),
  searchFoundationalDocs: vi.fn(async () => []),
  getFoundationalDocById: vi.fn(async () => null),
  getReviewRules: vi.fn(async () => []),
  getPrincipleByTopic: vi.fn(async () => null),
}));

vi.mock("@/lib/icon-libraries", () => ({
  searchIconLibraries: vi.fn(async () => []),
  getIconLibraryById: vi.fn(async () => null),
  searchIconsInLibrary: vi.fn(async () => []),
}));

let app: Hono;

beforeAll(async () => {
  const hash = await sha256(VALID_KEY);

  // Patch the DB mock to return the correct hash
  const { db } = await import("@/db");
  vi.mocked(db.query.apiKeys.findFirst).mockImplementation(async () => ({
    id: "key_rl_test",
    userId: "user_123",
    keyHash: hash,
    keyPrefix: "bd_live_abcd...",
    lastUsedAt: null,
    revokedAt: null,
    createdAt: new Date(),
  }) as never);

  const { v1Router } = await import("@/server/api/routes/v1/index");
  app = createApiTestApp(v1Router as Hono, "/v1");
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Rate limiting — search endpoints (30 req/min)", () => {
  it("allows request when under limit", async () => {
    rateLimitAllowed = true;
    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).not.toBe(429);
  });

  it("returns 429 when rate limit exceeded", async () => {
    rateLimitAllowed = false;
    rateLimitRetryAfter = 47;

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(429);

    rateLimitAllowed = true;
    rateLimitRetryAfter = 0;
  });

  it("includes Retry-After header in 429 response", async () => {
    rateLimitAllowed = false;
    rateLimitRetryAfter = 55;

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("55");

    rateLimitAllowed = true;
    rateLimitRetryAfter = 0;
  });

  it("rate limiter is called with API key ID (not an IP address)", async () => {
    rateLimitAllowed = false;
    rateLimitCalls.length = 0;

    await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));

    const lastCall = rateLimitCalls[rateLimitCalls.length - 1];
    expect(lastCall).toBeDefined();
    // First arg is the "key" — should be the API key ID, not an IP
    expect(lastCall[0]).toBe("key_rl_test");

    rateLimitAllowed = true;
  });
});

describe("Rate limiting — get endpoints (60 req/min)", () => {
  it("allows request when under limit", async () => {
    rateLimitAllowed = true;
    const res = await app.request(makeRequest("GET", "/v1/design-systems/stripe", {
      headers: withApiKey(),
    }));
    expect(res.status).not.toBe(429);
  });

  it("returns 429 when get limit exceeded", async () => {
    rateLimitAllowed = false;
    rateLimitRetryAfter = 30;

    const res = await app.request(makeRequest("GET", "/v1/design-systems/stripe", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(429);

    rateLimitAllowed = true;
    rateLimitRetryAfter = 0;
  });
});

describe("Rate limiting — review rules endpoint", () => {
  it("returns 429 when limit exceeded", async () => {
    rateLimitAllowed = false;
    rateLimitRetryAfter = 10;

    const res = await app.request(makeRequest("GET", "/v1/review-rules", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(429);

    rateLimitAllowed = true;
    rateLimitRetryAfter = 0;
  });
});
