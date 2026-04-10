/**
 * Tests for API key revocation
 *
 * Coverage:
 *  - Active key → 200
 *  - Revoked key (DB returns null because revokedAt IS NOT NULL) → 401
 *  - A different valid key still works after another is revoked
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { makeRequest, withApiKey, sha256, VALID_KEY, createApiTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Mutable DB state
// ---------------------------------------------------------------------------

type KeyRecord = {
  id: string;
  userId: string;
  keyHash: string;
  keyPrefix: string;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
  createdAt: Date;
} | null;

let mockKeyRecord: KeyRecord = null;

vi.mock("@/db", () => ({
  db: {
    query: {
      apiKeys: {
        findFirst: vi.fn(async () => mockKeyRecord),
      },
    },
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: vi.fn(() => Promise.resolve()) })) })),
  },
  apiKeys: {},
  usage: {},
}));

vi.mock("@/lib/ip-rate-limit", () => ({
  checkIPRateLimit: vi.fn(async () => ({ allowed: true, retryAfter: 0 })),
}));

vi.mock("@/lib/design-systems", () => ({
  searchDesignSystems: vi.fn(async () => [
    { id: "stripe", title: "Stripe", description: "d", personality: [], industry: [], componentCount: 0, matchScore: 90 },
  ]),
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
let validKeyHash: string;

beforeAll(async () => {
  validKeyHash = await sha256(VALID_KEY);

  const { v1Router } = await import("@/server/api/routes/v1/index");
  app = createApiTestApp(v1Router as Hono, "/v1");
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Key revocation", () => {
  it("allows access with an active (non-revoked) key", async () => {
    mockKeyRecord = {
      id: "key_active",
      userId: "user_123",
      keyHash: validKeyHash,
      keyPrefix: "bd_live_abcd...",
      lastUsedAt: null,
      revokedAt: null, // active
      createdAt: new Date(),
    };

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
  });

  it("returns 401 when key is revoked (DB returns null for the WHERE revokedAt IS NULL query)", async () => {
    // The middleware queries: WHERE keyHash = ? AND revokedAt IS NULL
    // A revoked key means the query returns nothing → mockKeyRecord = null
    mockKeyRecord = null;

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(401);
    const body = await res.json() as { code: string };
    expect(body.code).toBe("UNAUTHORIZED");
  });

  it("revoked key is blocked on all v1 endpoints", async () => {
    mockKeyRecord = null;

    const endpoints = [
      "/v1/review-rules",
      "/v1/principles",
      "/v1/icon-libraries/search?q=minimal",
    ];

    for (const endpoint of endpoints) {
      const res = await app.request(makeRequest("GET", endpoint, { headers: withApiKey() }));
      expect(res.status).toBe(401);
    }
  });

  it("a different valid key still works after another key is revoked", async () => {
    const ANOTHER_KEY = "bd_live_zyxwvutsrqponmlkjihgfedcba098765";
    const anotherHash = await sha256(ANOTHER_KEY);

    mockKeyRecord = {
      id: "key_still_active",
      userId: "user_123",
      keyHash: anotherHash,
      keyPrefix: "bd_live_zyxw...",
      lastUsedAt: null,
      revokedAt: null,
      createdAt: new Date(),
    };

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=startup", {
      headers: { Authorization: `Bearer ${ANOTHER_KEY}` },
    }));
    expect(res.status).toBe(200);
  });
});
