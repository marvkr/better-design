import { Hono } from "hono";
import { eq, and, isNull, gt, or } from "drizzle-orm";
import { db } from "@/db";
import { inviteTokens } from "@/db/schema";
import type { Variables } from "../app";

const invitesRoute = new Hono<{ Variables: Variables }>().get(
  "/validate/:token",
  async (c) => {
    const token = c.req.param("token");

    const [row] = await db
      .select({
        email: inviteTokens.email,
        usedAt: inviteTokens.usedAt,
        expiresAt: inviteTokens.expiresAt,
      })
      .from(inviteTokens)
      .where(eq(inviteTokens.token, token))
      .limit(1);

    if (!row) {
      return c.json({ valid: false, reason: "not_found" as const });
    }

    if (row.usedAt) {
      return c.json({ valid: false, reason: "already_used" as const });
    }

    if (row.expiresAt && row.expiresAt.getTime() < Date.now()) {
      return c.json({ valid: false, reason: "expired" as const });
    }

    return c.json({ valid: true as const, email: row.email });
  },
);

export default invitesRoute;

export async function consumeInviteForEmail(email: string): Promise<boolean> {
  const normalized = email.toLowerCase();
  const now = new Date();

  const [row] = await db
    .select({ id: inviteTokens.id })
    .from(inviteTokens)
    .where(
      and(
        eq(inviteTokens.email, normalized),
        isNull(inviteTokens.usedAt),
        or(isNull(inviteTokens.expiresAt), gt(inviteTokens.expiresAt, now)),
      ),
    )
    .limit(1);

  if (!row) return false;

  await db
    .update(inviteTokens)
    .set({ usedAt: now })
    .where(eq(inviteTokens.id, row.id));

  return true;
}
