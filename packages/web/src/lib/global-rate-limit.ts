import { db } from "@/db";
import { usage } from "@/db/schema";
import { eq } from "drizzle-orm";

const GLOBAL_KEY = "global_rate_limit";
const GLOBAL_LIMIT = 50; // Max requests per window
const WINDOW_MS = 60 * 1000; // 1 minute window

export async function checkGlobalRateLimit(): Promise<{
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}> {
  const now = Date.now();

  const record = await db.query.usage.findFirst({
    where: eq(usage.key, GLOBAL_KEY),
  });

  // No record or expired - create/reset
  if (!record || (record.expire && record.expire.getTime() < now)) {
    const expire = new Date(now + WINDOW_MS);
    await db
      .insert(usage)
      .values({ key: GLOBAL_KEY, points: GLOBAL_LIMIT - 1, expire })
      .onConflictDoUpdate({
        target: usage.key,
        set: { points: GLOBAL_LIMIT - 1, expire },
      });
    return { allowed: true, remaining: GLOBAL_LIMIT - 1, resetInMs: WINDOW_MS };
  }

  // Check if limit exceeded
  if (record.points <= 0) {
    const resetInMs = record.expire!.getTime() - now;
    return { allowed: false, remaining: 0, resetInMs };
  }

  // Decrement counter
  await db
    .update(usage)
    .set({ points: record.points - 1 })
    .where(eq(usage.key, GLOBAL_KEY));

  return {
    allowed: true,
    remaining: record.points - 1,
    resetInMs: record.expire!.getTime() - now,
  };
}
