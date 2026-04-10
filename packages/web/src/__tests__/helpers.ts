/**
 * Shared test utilities.
 *
 * Each test file creates a minimal Hono app mounting only the route under test.
 * This avoids loading the full app (which imports many unrelated routes/modules).
 */
import { Hono } from "hono";

export const TEST_USER = {
  id: "user_test_123",
  name: "Test User",
  email: "test@example.com",
  plan: "free",
  image: null,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  bonusClaimed: false,
};

export const TEST_SESSION = {
  session: {
    id: "sess_123",
    userId: TEST_USER.id,
    token: "tok_123",
    expiresAt: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: null,
    userAgent: null,
  },
  user: TEST_USER,
};

export const VALID_KEY = "bd_live_abcdefghijklmnopqrstuvwxyz123456";

export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function makeRequest(
  method: string,
  path: string,
  opts: { headers?: Record<string, string>; body?: unknown } = {},
): Request {
  const url = `http://localhost${path}`;
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...opts.headers },
  };
  if (opts.body !== undefined) {
    init.body = JSON.stringify(opts.body);
  }
  return new Request(url, init);
}

export function withApiKey(key = VALID_KEY): Record<string, string> {
  return { Authorization: `Bearer ${key}` };
}

/** Standard error handler that maps AppError → correct HTTP status */
export function withErrorHandler(app: Hono): Hono {
  return app.onError((err, c) => {
    const e = err as { code?: string; statusCode?: number; message?: string };
    if (e.statusCode) {
      return c.json(
        { code: e.code ?? "ERROR", message: e.message ?? "Error" },
        e.statusCode as 400 | 401 | 403 | 404 | 429 | 500,
      );
    }
    console.error("Unhandled test error:", err);
    return c.json({ code: "INTERNAL_ERROR", message: "Internal server error" }, 500);
  });
}

/**
 * Create a minimal Hono app with session auth middleware + error handler,
 * then mount a single route at the given path.
 */
export function createTestApp(
  path: string,
  route: Hono,
  sessionResolver: () => unknown = () => TEST_SESSION,
): Hono {
  type Vars = { session: unknown; user: unknown };
  const app = new Hono<{ Variables: Vars }>()
    .onError((err, c) => {
      const e = err as { code?: string; statusCode?: number; message?: string };
      if (e.statusCode) {
        return c.json(
          { code: e.code ?? "ERROR", message: e.message ?? "Error" },
          e.statusCode as 400 | 401 | 403 | 404 | 429 | 500,
        );
      }
      return c.json({ code: "INTERNAL_ERROR", message: "Internal server error" }, 500);
    })
    .use("*", async (c, next) => {
      const session = sessionResolver() as { user: unknown } | null;
      c.set("session", session);
      c.set("user", session?.user ?? null);
      await next();
    })
    .route(path, route);

  return app as unknown as Hono;
}

/**
 * Create a minimal Hono app for v1 / MCP routes that have their own auth middleware.
 * Just adds error handling — no session middleware.
 */
export function createApiTestApp(route: Hono, basePath: string): Hono {
  const app = new Hono()
    .onError((err, c) => {
      const e = err as { code?: string; statusCode?: number; message?: string };
      if (e.statusCode) {
        return c.json(
          { code: e.code ?? "ERROR", message: e.message ?? "Error" },
          e.statusCode as 400 | 401 | 403 | 404 | 429 | 500,
        );
      }
      return c.json({ code: "INTERNAL_ERROR", message: "Internal server error" }, 500);
    })
    .route(basePath, route);

  return app as unknown as Hono;
}
