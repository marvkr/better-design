import { db } from "@/db"
import { usage } from "@/db/schema"
import { eq } from "drizzle-orm"

/**
 * DB-backed per-IP rate limiter.
 * Uses the existing `usage` table so no new infrastructure is needed.
 * Survives serverless cold starts unlike in-memory stores.
 */
export async function checkIPRateLimit(
  ip: string,
  action: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = `rl:${action}:${ip}`
  const now = Date.now()

  const record = await db.query.usage.findFirst({
    where: eq(usage.key, key),
  })

  // No record or window expired — reset
  if (!record || (record.expire && record.expire.getTime() < now)) {
    const expire = new Date(now + windowMs)
    await db
      .insert(usage)
      .values({ key, points: limit - 1, expire })
      .onConflictDoUpdate({
        target: usage.key,
        set: { points: limit - 1, expire },
      })
    return { allowed: true, retryAfter: 0 }
  }

  if (record.points <= 0) {
    const retryAfter = Math.ceil((record.expire!.getTime() - now) / 1000)
    return { allowed: false, retryAfter }
  }

  await db
    .update(usage)
    .set({ points: record.points - 1 })
    .where(eq(usage.key, key))

  return { allowed: true, retryAfter: 0 }
}
