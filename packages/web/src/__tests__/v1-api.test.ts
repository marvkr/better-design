/**
 * Tests for /api/v1/* (public REST API with API key auth)
 *
 * Coverage:
 *  - 401 without / with bad key
 *  - 200 with valid key on all endpoints
 *  - GET /design-systems/search, /:id, /:id/components
 *  - GET /principles, /principles/search, /principles/:topic
 *  - GET /icon-libraries/search, /:id/icons
 *  - GET /review-rules
 *  - CORS headers
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { makeRequest, withApiKey, sha256, VALID_KEY, createApiTestApp } from "./helpers";

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
            ? { id: "key_v1_test", userId: "u1", keyHash: validKeyHash, keyPrefix: "bd_live_abcd...", lastUsedAt: null, revokedAt: null, createdAt: new Date() }
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
  searchDesignSystems: vi.fn(async () => [
    { id: "stripe", title: "Stripe", description: "Fintech", personality: ["professional"], industry: ["fintech"], componentCount: 20, matchScore: 92 },
  ]),
  getDesignSystemById: vi.fn(async (id: string) =>
    id === "stripe"
      ? {
          metadata: { id: "stripe", title: "Stripe", description: "Fintech", personality: [], industry: [], componentCount: 1, primaryColor: "#635BFF", borderRadius: "4px", font: "Inter", rawContent: "...", iconLibraryId: null, iconVariant: null, createdAt: new Date(), updatedAt: new Date() },
          components: [{ id: 1, designSystemId: "stripe", name: "button", description: "Button", code: ".btn{}", useCases: null, language: "css", destination: null }],
        }
      : null,
  ),
}));

vi.mock("@/lib/foundational-docs", () => ({
  listFoundationalDocs: vi.fn(async () => [
    { id: "principle-spacing", title: "Spacing" },
    { id: "principle-color", title: "Color" },
  ]),
  searchFoundationalDocs: vi.fn(async () => [
    { id: "principle-spacing", title: "Spacing", content: "Use consistent spacing.", matchScore: 85, category: "principle", hasCodeExamples: false, contentLength: 100 },
  ]),
  getFoundationalDocById: vi.fn(async (id: string) =>
    id === "principle-spacing"
      ? { id: "principle-spacing", title: "Spacing", content: "Use consistent spacing." }
      : null,
  ),
  getReviewRules: vi.fn(async () => [
    { id: "review-accessibility", title: "Accessibility Rules", content: "WCAG 2.1 compliance." },
  ]),
  getPrincipleByTopic: vi.fn(async (topic: string) =>
    topic === "spacing"
      ? { id: "principle-spacing", title: "Spacing", content: "Use consistent spacing." }
      : null,
  ),
}));

vi.mock("@/lib/icon-libraries", () => ({
  searchIconLibraries: vi.fn(async () => [
    { id: "tabler", name: "Tabler Icons", prefix: "tabler", category: "UI", tags: ["minimal"], description: "Clean icons", variants: null, defaultVariant: null, iconCount: 4000, matchScore: 88 },
  ]),
  getIconLibraryById: vi.fn(async (id: string) =>
    id === "tabler"
      ? { id: "tabler", name: "Tabler Icons", prefix: "tabler", category: "UI", tags: ["minimal"], description: null, variants: null, defaultVariant: null, iconCount: 4000, createdAt: new Date(), updatedAt: new Date(), variantFormat: null, license: "MIT" }
      : null,
  ),
  searchIconsInLibrary: vi.fn(async () => ["tabler:home", "tabler:settings"]),
}));

// ---------------------------------------------------------------------------
// Import routes after mocks
// ---------------------------------------------------------------------------
let app: Hono;

beforeAll(async () => {
  validKeyHash = await sha256(VALID_KEY);
  const { v1Router } = await import("@/server/api/routes/v1/index");
  app = createApiTestApp(v1Router as Hono, "/v1");
});

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

describe("API key auth", () => {
  it("returns 401 with no Authorization header", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech"));
    expect(res.status).toBe(401);
  });

  it("returns 401 with wrong key prefix", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: { Authorization: "Bearer sk_wrong_format" },
    }));
    expect(res.status).toBe(401);
  });

  it("returns 401 when key is not in DB", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.apiKeys.findFirst).mockResolvedValueOnce(null as never);

    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Design systems
// ---------------------------------------------------------------------------

describe("GET /v1/design-systems/search", () => {
  it("returns 200 with results for fintech query", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/search?q=fintech", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { results: Array<{ id: string; matchScore: number }> };
    expect(body.results[0].id).toBe("stripe");
    expect(body.results[0].matchScore).toBeGreaterThan(0);
  });

  it("returns 400 when q param is missing", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/search", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(400);
  });
});

describe("GET /v1/design-systems/:id", () => {
  it("returns metadata for a known design system", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/stripe", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { metadata: { id: string }; componentCount: number };
    expect(body.metadata.id).toBe("stripe");
    expect(body.componentCount).toBe(1);
  });

  it("returns 404 for unknown design system", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/unknown-xyz", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(404);
  });
});

describe("GET /v1/design-systems/:id/components", () => {
  it("returns all components", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/stripe/components", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { components: unknown[] };
    expect(body.components).toHaveLength(1);
  });

  it("filters by name", async () => {
    const res = await app.request(makeRequest("GET", "/v1/design-systems/stripe/components?names=button", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { components: Array<{ name: string }> };
    expect(body.components[0].name).toBe("button");
  });
});

// ---------------------------------------------------------------------------
// Principles
// ---------------------------------------------------------------------------

describe("GET /v1/principles", () => {
  it("lists all principles", async () => {
    const res = await app.request(makeRequest("GET", "/v1/principles", { headers: withApiKey() }));
    expect(res.status).toBe(200);
    const body = await res.json() as { principles: unknown[] };
    expect(body.principles).toHaveLength(2);
  });
});

describe("GET /v1/principles/search", () => {
  it("returns search results", async () => {
    const res = await app.request(makeRequest("GET", "/v1/principles/search?q=spacing", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { results: unknown[] };
    expect(body.results).toHaveLength(1);
  });
});

describe("GET /v1/principles/:topic", () => {
  it("returns principle by topic", async () => {
    const res = await app.request(makeRequest("GET", "/v1/principles/spacing", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { id: string };
    expect(body.id).toBe("principle-spacing");
  });

  it("returns 404 for unknown topic", async () => {
    const res = await app.request(makeRequest("GET", "/v1/principles/nonexistent", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Icon libraries
// ---------------------------------------------------------------------------

describe("GET /v1/icon-libraries/search", () => {
  it("returns icon library results", async () => {
    const res = await app.request(makeRequest("GET", "/v1/icon-libraries/search?q=minimal+clean", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { results: Array<{ id: string }> };
    expect(body.results[0].id).toBe("tabler");
  });
});

describe("GET /v1/icon-libraries/:id/icons", () => {
  it("returns icons for a valid library", async () => {
    const res = await app.request(makeRequest("GET", "/v1/icon-libraries/tabler/icons?q=home", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { icons: string[]; library: { id: string } };
    expect(body.icons).toContain("tabler:home");
    expect(body.library.id).toBe("tabler");
  });

  it("returns 404 for unknown library", async () => {
    const res = await app.request(makeRequest("GET", "/v1/icon-libraries/unknown/icons?q=home", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Review rules
// ---------------------------------------------------------------------------

describe("GET /v1/review-rules", () => {
  it("returns all review rules", async () => {
    const res = await app.request(makeRequest("GET", "/v1/review-rules", { headers: withApiKey() }));
    expect(res.status).toBe(200);
    const body = await res.json() as { rules: Array<{ id: string }> };
    expect(body.rules[0].id).toBe("review-accessibility");
  });

  it("filters by category=accessibility", async () => {
    const res = await app.request(makeRequest("GET", "/v1/review-rules?category=accessibility", {
      headers: withApiKey(),
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { rules: unknown[] };
    expect(body.rules).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

describe("CORS", () => {
  it("v1 routes include Access-Control-Allow-Origin: *", async () => {
    const req = new Request("http://localhost/v1/design-systems/search", {
      method: "OPTIONS",
      headers: {
        Origin: "https://example.com",
        "Access-Control-Request-Method": "GET",
      },
    });
    const res = await app.request(req);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
  });
});
