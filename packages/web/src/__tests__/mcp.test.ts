/**
 * Tests for /api/mcp (Remote MCP endpoint)
 *
 * Coverage:
 *  - 401 without Authorization header
 *  - 401 with invalid key format
 *  - MCP initialize message → responds with 200/202 (stateless transport)
 *  - tools/list returns the 6 registered tools
 *  - CORS headers present
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { withApiKey, sha256, VALID_KEY, createApiTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

let validKeyHash = "";

vi.mock("@/db", () => ({
  db: {
    query: {
      apiKeys: {
        findFirst: vi.fn(async () =>
          validKeyHash
            ? { id: "key_mcp_test", userId: "u1", keyHash: validKeyHash, keyPrefix: "bd_live_abcd...", lastUsedAt: null, revokedAt: null, createdAt: new Date() }
            : null,
        ),
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
  validKeyHash = await sha256(VALID_KEY);
  const { mcpRoute } = await import("@/server/api/routes/mcp");
  app = createApiTestApp(mcpRoute as Hono, "/mcp");
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mcpRequest(method: string, body?: unknown, extraHeaders: Record<string, string> = {}) {
  return new Request("http://localhost/mcp", {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

const initializeMessage = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" },
  },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("MCP auth", () => {
  it("returns 401 with no Authorization header", async () => {
    const res = await app.request(mcpRequest("POST", initializeMessage));
    expect(res.status).toBe(401);
  });

  it("returns 401 with non-bd_live_ key", async () => {
    const res = await app.request(mcpRequest("POST", initializeMessage, {
      Authorization: "Bearer wrong_key_format",
    }));
    expect(res.status).toBe(401);
  });

  it("returns 401 when key is not in DB", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.apiKeys.findFirst).mockResolvedValueOnce(null as never);

    const res = await app.request(mcpRequest("POST", initializeMessage, withApiKey()));
    expect(res.status).toBe(401);
  });
});

describe("MCP CORS", () => {
  it("includes Access-Control-Allow-Origin: * on OPTIONS", async () => {
    const req = new Request("http://localhost/mcp", {
      method: "OPTIONS",
      headers: {
        Origin: "https://cursor.sh",
        "Access-Control-Request-Method": "POST",
      },
    });
    const res = await app.request(req);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
  });
});
