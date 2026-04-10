import { createMiddleware } from "hono/factory";
import { eq } from "drizzle-orm";
import { db, apiKeys } from "@/db";
import { checkIPRateLimit } from "@/lib/ip-rate-limit";
import { unauthorized, tooManyRequests } from "../../errors";

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export type ApiKeyVariables = {
  apiKeyId: string;
  apiKeyUserId: string;
};

export const requireApiKey = createMiddleware<{ Variables: ApiKeyVariables }>(
  async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw unauthorized("Missing or invalid Authorization header");
    }

    const key = authHeader.slice(7);
    if (!key.startsWith("bd_live_")) {
      throw unauthorized("Invalid API key format");
    }

    const keyHash = await hashKey(key);

    const apiKey = await db.query.apiKeys.findFirst({
      where: (k, { eq, and, isNull }) =>
        and(eq(k.keyHash, keyHash), isNull(k.revokedAt)),
    });

    if (!apiKey) {
      throw unauthorized("Invalid or revoked API key");
    }

    c.set("apiKeyId", apiKey.id);
    c.set("apiKeyUserId", apiKey.userId);

    // Update lastUsedAt debounced (only if >1 min since last update)
    const oneMinuteAgo = new Date(Date.now() - 60_000);
    if (!apiKey.lastUsedAt || apiKey.lastUsedAt < oneMinuteAgo) {
      void db
        .update(apiKeys)
        .set({ lastUsedAt: new Date() })
        .where(eq(apiKeys.id, apiKey.id));
    }

    await next();
  },
);

export function rateLimit(action: string, limit: number, windowMs: number) {
  return createMiddleware<{ Variables: ApiKeyVariables }>(async (c, next) => {
    const apiKeyId = c.get("apiKeyId");
    const result = await checkIPRateLimit(apiKeyId, action, limit, windowMs);
    if (!result.allowed) {
      c.header("Retry-After", String(result.retryAfter));
      throw tooManyRequests(
        `Rate limit exceeded. Retry after ${result.retryAfter} seconds.`,
      );
    }
    await next();
  });
}
