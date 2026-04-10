import { eq } from "drizzle-orm";

import { db, usage } from "@/db";
import { alertCreditExhaustion } from "@/lib/alerts";

const FREE_POINTS = 2;
const PRO_POINTS = 100;
const ANONYMOUS_POINTS = 1;
const DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ANONYMOUS_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day
const GENERATION_COST = 1;

export function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "unknown";
}

async function getOrCreateUsageRecord(key: string, maxPoints: number, durationMs: number) {
  const existing = await db.query.usage.findFirst({
    where: eq(usage.key, key),
  });

  if (existing) {
    if (existing.expire && existing.expire < new Date()) {
      const newExpire = new Date(Date.now() + durationMs);
      await db
        .update(usage)
        .set({ points: maxPoints, expire: newExpire })
        .where(eq(usage.key, key));
      return { points: maxPoints, expire: newExpire };
    }
    return existing;
  }

  const expire = new Date(Date.now() + durationMs);
  const [created] = await db
    .insert(usage)
    .values({ key, points: maxPoints, expire })
    .returning();

  return created;
}

type SessionUser = { id: string; plan?: string | null; isAdmin?: boolean | null };

const UNLIMITED = { remainingPoints: 999999, msBeforeNext: 0 };

export async function consumeCredits(user: SessionUser) {
  if (process.env.NODE_ENV === "development") {
    return { remainingPoints: 999, msBeforeNext: 0 };
  }

  if (user.isAdmin) {
    return UNLIMITED;
  }

  const hasProAccess = user.plan === "pro";
  const maxPoints = hasProAccess ? PRO_POINTS : FREE_POINTS;
  const key = user.id;

  const record = await getOrCreateUsageRecord(key, maxPoints, DURATION_MS);

  if (record.points < GENERATION_COST) {
    throw new Error("Rate limit exceeded");
  }

  const remaining = record.points - GENERATION_COST;

  await db
    .update(usage)
    .set({ points: remaining })
    .where(eq(usage.key, key));

  if (remaining === 0) {
    alertCreditExhaustion(user.id, remaining).catch(() => {});
  }

  return {
    remainingPoints: remaining,
    msBeforeNext: record.expire ? record.expire.getTime() - Date.now() : 0,
  };
}

export async function getUsageStatus(user: SessionUser) {
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  if (user.isAdmin) {
    return {
      remainingPoints: UNLIMITED.remainingPoints,
      consumedPoints: 0,
      msBeforeNext: 0,
    };
  }

  const hasProAccess = user.plan === "pro";
  const maxPoints = hasProAccess ? PRO_POINTS : FREE_POINTS;
  const key = user.id;

  const record = await getOrCreateUsageRecord(key, maxPoints, DURATION_MS);

  return {
    remainingPoints: record.points,
    consumedPoints: maxPoints - record.points,
    msBeforeNext: record.expire ? record.expire.getTime() - Date.now() : 0,
  };
}

export async function consumeAnonymousCredits(ip: string) {
  if (process.env.NODE_ENV === "development") {
    return { remainingPoints: 999, msBeforeNext: 0 };
  }

  const key = `anon_${ip}`;

  const record = await getOrCreateUsageRecord(key, ANONYMOUS_POINTS, ANONYMOUS_DURATION_MS);

  if (record.points < GENERATION_COST) {
    throw new Error("Rate limit exceeded");
  }

  await db
    .update(usage)
    .set({ points: record.points - GENERATION_COST })
    .where(eq(usage.key, key));

  return {
    remainingPoints: record.points - GENERATION_COST,
    msBeforeNext: record.expire ? record.expire.getTime() - Date.now() : 0,
  };
}

export async function getAnonymousUsageStatus(ip: string) {
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  const key = `anon_${ip}`;

  const record = await getOrCreateUsageRecord(key, ANONYMOUS_POINTS, ANONYMOUS_DURATION_MS);

  return {
    remainingPoints: record.points,
    consumedPoints: ANONYMOUS_POINTS - record.points,
    msBeforeNext: record.expire ? record.expire.getTime() - Date.now() : 0,
  };
}
