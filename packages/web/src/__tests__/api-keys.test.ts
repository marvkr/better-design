/**
 * Tests for /api/api-keys (CRUD management — session auth)
 *
 * Coverage:
 *  - GET /  → lists active keys for the session user
 *  - POST / → creates a key, returns full key once
 *  - DELETE /:id → revokes a key
 *  - 401 when not authenticated
 *  - 404 / 403 on delete edge cases
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import { Hono } from "hono";
import { TEST_USER, TEST_SESSION, makeRequest, createTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Module mocks — must be declared before dynamic imports
// ---------------------------------------------------------------------------

const mockDbUpdate = vi.fn(() => ({
  set: vi.fn(() => ({ where: vi.fn(() => Promise.resolve()) })),
}));

const mockInsertValues = vi.fn(() => Promise.resolve());

const mockFindMany = vi.fn(async () => [
  {
    id: "key_abc",
    name: "Claude Code",
    keyPrefix: "bd_live_abcd...",
    createdAt: new Date("2026-01-01"),
    lastUsedAt: null,
  },
]);

const mockFindFirst = vi.fn(async () => null as unknown);

vi.mock("@/db", () => ({
  db: {
    query: {
      apiKeys: { findMany: mockFindMany, findFirst: mockFindFirst },
    },
    insert: vi.fn(() => ({ values: mockInsertValues })),
    update: mockDbUpdate,
  },
  apiKeys: { id: "id" },
}));

vi.mock("@/lib/posthog", () => ({
  getPostHog: vi.fn(() => ({
    capture: vi.fn(),
  })),
}));

// ---------------------------------------------------------------------------
// Build the minimal test app after mocks are set up
// ---------------------------------------------------------------------------
let app: Hono;
let sessionState: typeof TEST_SESSION | null = TEST_SESSION;

beforeAll(async () => {
  const { default: apiKeysRoute } = await import("@/server/api/routes/api-keys");
  app = createTestApp("/api-keys", apiKeysRoute as Hono, () => sessionState);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("GET /api-keys", () => {
  it("returns 200 with list of keys when authenticated", async () => {
    sessionState = TEST_SESSION;
    const res = await app.request(makeRequest("GET", "/api-keys"));
    expect(res.status).toBe(200);
    const body = await res.json() as { keys: unknown[] };
    expect(Array.isArray(body.keys)).toBe(true);
    expect(body.keys).toHaveLength(1);
  });

  it("returns 401 when not authenticated", async () => {
    sessionState = null;
    const res = await app.request(makeRequest("GET", "/api-keys"));
    expect(res.status).toBe(401);
    sessionState = TEST_SESSION;
  });
});

describe("POST /api-keys", () => {
  it("creates a key and returns it once with bd_live_ prefix", async () => {
    sessionState = TEST_SESSION;
    const res = await app.request(makeRequest("POST", "/api-keys", { body: { name: "My Agent" } }));
    expect(res.status).toBe(201);
    const body = await res.json() as { key: string; keyPrefix: string; name: string };
    expect(body.key).toMatch(/^bd_live_/);
    expect(body.key).toHaveLength(40); // "bd_live_" (8) + 32 chars
    expect(body.keyPrefix).toContain("...");
    expect(body.name).toBe("My Agent");
  });

  it("returns 400 when name is empty", async () => {
    sessionState = TEST_SESSION;
    const res = await app.request(makeRequest("POST", "/api-keys", { body: { name: "" } }));
    expect(res.status).toBe(400);
  });

  it("returns 401 when not authenticated", async () => {
    sessionState = null;
    const res = await app.request(makeRequest("POST", "/api-keys", { body: { name: "Test" } }));
    expect(res.status).toBe(401);
    sessionState = TEST_SESSION;
  });
});

describe("DELETE /api-keys/:id", () => {
  it("revokes a key owned by the user", async () => {
    sessionState = TEST_SESSION;
    mockFindFirst.mockResolvedValueOnce({
      id: "key_abc",
      userId: TEST_USER.id,
      name: "Claude Code",
      keyHash: "somehash",
      keyPrefix: "bd_live_abcd...",
      createdAt: new Date(),
      lastUsedAt: null,
      revokedAt: null,
    });

    const res = await app.request(makeRequest("DELETE", "/api-keys/key_abc"));
    expect(res.status).toBe(200);
    const body = await res.json() as { success: boolean };
    expect(body.success).toBe(true);
  });

  it("returns 404 when key does not exist", async () => {
    sessionState = TEST_SESSION;
    mockFindFirst.mockResolvedValueOnce(null);

    const res = await app.request(makeRequest("DELETE", "/api-keys/nonexistent"));
    expect(res.status).toBe(404);
  });

  it("returns 403 when key belongs to another user", async () => {
    sessionState = TEST_SESSION;
    mockFindFirst.mockResolvedValueOnce({
      id: "key_other",
      userId: "other_user_456",
      name: "Someone Else",
      keyHash: "somehash",
      keyPrefix: "bd_live_xxxx...",
      createdAt: new Date(),
      lastUsedAt: null,
      revokedAt: null,
    });

    const res = await app.request(makeRequest("DELETE", "/api-keys/key_other"));
    expect(res.status).toBe(403);
  });
});
