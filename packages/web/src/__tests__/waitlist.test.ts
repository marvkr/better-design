/**
 * Tests for /api/waitlist
 *
 * Coverage:
 *  - POST /join — success, full waitlist, invalid email
 *  - GET /spots-left — returns remaining spots
 */

import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Hono } from "hono";
import { makeRequest, createTestApp } from "./helpers";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

let currentCount = 0;

vi.mock("@/db", () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        then: vi.fn((cb: (r: { count: number }[]) => unknown) => cb([{ count: currentCount }])),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoNothing: vi.fn(() => Promise.resolve()),
      })),
    })),
  },
  waitlist: {},
}));

vi.mock("@/db/schema", () => ({
  waitlist: {},
}));

vi.mock("@/lib/alerts", () => ({
  alertWaitlistSignup: vi.fn(async () => {}),
}));

vi.mock("@/lib/posthog", () => ({
  getPostHog: vi.fn(() => ({
    capture: vi.fn(),
  })),
}));

let app: Hono;

beforeAll(async () => {
  const { default: waitlistRoute } = await import("@/server/api/routes/waitlist");
  app = createTestApp("/waitlist", waitlistRoute as unknown as Hono);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("GET /waitlist/spots-left", () => {
  it("returns remaining spots", async () => {
    currentCount = 42;
    const res = await app.request(makeRequest("GET", "/waitlist/spots-left"));
    expect(res.status).toBe(200);
    const body = await res.json() as { spotsLeft: number };
    expect(body.spotsLeft).toBe(58); // 100 - 42
  });

  it("returns 0 when full", async () => {
    currentCount = 100;
    const res = await app.request(makeRequest("GET", "/waitlist/spots-left"));
    expect(res.status).toBe(200);
    const body = await res.json() as { spotsLeft: number };
    expect(body.spotsLeft).toBe(0);
  });
});

describe("POST /waitlist/join", () => {
  it("succeeds with valid email", async () => {
    currentCount = 10;
    const res = await app.request(makeRequest("POST", "/waitlist/join", {
      body: { email: "user@example.com" },
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { success: boolean; spotsLeft: number };
    expect(body.success).toBe(true);
    expect(body.spotsLeft).toBe(90);
  });

  it("returns full when waitlist is at capacity", async () => {
    currentCount = 100;
    const res = await app.request(makeRequest("POST", "/waitlist/join", {
      body: { email: "user@example.com" },
    }));
    expect(res.status).toBe(200);
    const body = await res.json() as { success: boolean; spotsLeft: number; message: string };
    expect(body.success).toBe(false);
    expect(body.spotsLeft).toBe(0);
    expect(body.message).toBe("Waitlist is full");
  });

  it("returns 400 for invalid email", async () => {
    currentCount = 10;
    const res = await app.request(makeRequest("POST", "/waitlist/join", {
      body: { email: "not-an-email" },
    }));
    expect(res.status).toBe(400);
  });
});
