import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { db, user as userTable, usage } from "@/db";
import { alertBonusClaimed } from "@/lib/alerts";
import type { Variables } from "../app";
import { requireAuth } from "../app";

const BONUS_CREDITS = 3;

const app = new Hono<{ Variables: Variables }>().post("/", async (c) => {
  const sessionUser = requireAuth(c);

  const dbUser = await db.query.user.findFirst({
    where: eq(userTable.id, sessionUser.id),
  });

  if (!dbUser) {
    return c.json({ error: "User not found" }, 404);
  }

  if (dbUser.bonusClaimed) {
    return c.json({ alreadyClaimed: true });
  }

  await db
    .update(userTable)
    .set({ bonusClaimed: true })
    .where(eq(userTable.id, sessionUser.id));

  const existingUsage = await db.query.usage.findFirst({
    where: eq(usage.key, sessionUser.id),
  });

  if (existingUsage) {
    await db
      .update(usage)
      .set({ points: existingUsage.points + BONUS_CREDITS })
      .where(eq(usage.key, sessionUser.id));
  }

  void alertBonusClaimed(dbUser.email);

  return c.json({ success: true, bonusCredits: BONUS_CREDITS });
});

export default app;
