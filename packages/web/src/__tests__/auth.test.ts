/**
 * Tests for auth module
 *
 * Coverage:
 *  - auth instance has expected properties (handler, api)
 *  - toNextJsHandler compatibility ("handler" in auth works)
 *  - Session type is exported
 */

import { describe, it, expect, vi } from "vitest";

// Mock all heavy dependencies so we don't need a real DB connection
vi.mock("@/db", () => ({
  db: {},
}));

vi.mock("@/lib/alerts", () => ({
  alertNewSignup: vi.fn(async () => {}),
}));

vi.mock("@/lib/posthog", () => ({
  getPostHog: vi.fn(() => ({
    identify: vi.fn(),
    capture: vi.fn(),
  })),
}));

describe("auth module", () => {
  it("exports an auth instance with a handler property", async () => {
    const { auth } = await import("@/lib/auth");
    expect(auth).toBeDefined();
    expect(auth).toHaveProperty("handler");
    expect(typeof auth.handler).toBe("function");
  });

  it("exports an auth instance with api.getSession", async () => {
    const { auth } = await import("@/lib/auth");
    expect(auth.api).toBeDefined();
    expect(typeof auth.api.getSession).toBe("function");
  });

  it("'handler' in auth returns true (toNextJsHandler compatibility)", async () => {
    const { auth } = await import("@/lib/auth");
    // This is the exact check toNextJsHandler does
    expect("handler" in auth).toBe(true);
  });

  it("works with toNextJsHandler without throwing", async () => {
    const { auth } = await import("@/lib/auth");
    const { toNextJsHandler } = await import("better-auth/next-js");
    const handlers = toNextJsHandler(auth);
    expect(handlers).toHaveProperty("GET");
    expect(handlers).toHaveProperty("POST");
    expect(typeof handlers.GET).toBe("function");
    expect(typeof handlers.POST).toBe("function");
  });
});
