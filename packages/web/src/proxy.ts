import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60_000) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function check(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number; retryAfter: number } {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, retryAfter: 0 };
}

const RULES: Array<{
  match: (path: string, method: string) => boolean;
  limit: number;
  windowMs: number;
  label: string;
}> = [
  {
    match: (p) => p.includes("projects.createAnonymous"),
    limit: 3,
    windowMs: 60_000,
    label: "anon-create",
  },
  {
    match: (p) => p.includes("projects.create") && !p.includes("Anonymous"),
    limit: 10,
    windowMs: 60_000,
    label: "auth-create",
  },
  {
    match: (p) => p.includes("projects.selectDesignSystem"),
    limit: 10,
    windowMs: 60_000,
    label: "select-ds",
  },
  {
    match: (p, m) => p === "/api/waitlist" && m === "POST",
    limit: 3,
    windowMs: 5 * 60_000,
    label: "waitlist",
  },
  {
    match: (p, m) => p === "/api/claim-bonus" && m === "POST",
    limit: 5,
    windowMs: 60 * 60_000,
    label: "bonus",
  },
  {
    match: (p) => p.startsWith("/api/"),
    limit: 150,
    windowMs: 60_000,
    label: "global",
  },
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const ip = getIP(req);

  for (const rule of RULES) {
    if (!rule.match(pathname, method)) continue;

    const result = check(`${rule.label}:${ip}`, rule.limit, rule.windowMs);

    if (!result.allowed) {
      void fetch(new URL("/api/internal/alert", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "rate-limit", ip, endpoint: pathname, label: rule.label }),
      }).catch(() => {});

      return new NextResponse(
        JSON.stringify({ error: "Too many requests", retryAfter: result.retryAfter }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(result.retryAfter),
            "X-RateLimit-Limit": String(rule.limit),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Remaining", String(result.remaining));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
