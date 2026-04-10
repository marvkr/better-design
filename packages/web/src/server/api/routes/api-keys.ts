import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, apiKeys } from "@/db";
import type { Variables } from "../app";
import { requireAuth } from "../app";
import { notFound, forbidden } from "../errors";

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateApiKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomPart = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => chars[b % chars.length])
    .join("");
  return `bd_live_${randomPart}`;
}

function generateId(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const apiKeysRoute = new Hono<{ Variables: Variables }>()
  .get("/", async (c) => {
    const user = requireAuth(c);
    const keys = await db.query.apiKeys.findMany({
      where: (k, { eq, and, isNull }) => and(eq(k.userId, user.id), isNull(k.revokedAt)),
      columns: {
        id: true,
        name: true,
        keyPrefix: true,
        createdAt: true,
        lastUsedAt: true,
      },
      orderBy: (k, { desc }) => [desc(k.createdAt)],
    });
    return c.json({ keys });
  })
  .post(
    "/",
    zValidator("json", z.object({ name: z.string().min(1).max(100) })),
    async (c) => {
      const user = requireAuth(c);
      const { name } = c.req.valid("json");

      const fullKey = generateApiKey();
      const keyHash = await hashKey(fullKey);
      const keyPrefix = fullKey.slice(0, 12) + "...";
      const id = generateId();

      await db.insert(apiKeys).values({
        id,
        userId: user.id,
        name,
        keyHash,
        keyPrefix,
        createdAt: new Date(),
      });

      return c.json({ id, name, keyPrefix, key: fullKey }, 201);
    },
  )
  .delete("/:id", async (c) => {
    const user = requireAuth(c);
    const { id } = c.req.param();

    const key = await db.query.apiKeys.findFirst({
      where: (k, { eq }) => eq(k.id, id),
    });

    if (!key) throw notFound("API key not found");
    if (key.userId !== user.id) throw forbidden("Not authorized");

    await db
      .update(apiKeys)
      .set({ revokedAt: new Date() })
      .where(eq(apiKeys.id, id));

    return c.json({ success: true });
  });

export default apiKeysRoute;
