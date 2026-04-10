import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { user, usage } from "@/db/schema";
import { auth } from "@/lib/auth";

const BONUS_CREDITS = 3;

export async function POST() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if bonus already claimed
    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    if (!existingUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (existingUser.bonusClaimed) {
      return Response.json(
        { error: "Bonus already claimed", alreadyClaimed: true },
        { status: 400 }
      );
    }

    // Mark bonus as claimed
    await db
      .update(user)
      .set({ bonusClaimed: true })
      .where(eq(user.id, session.user.id));

    // Add bonus credits to usage
    const existingUsage = await db.query.usage.findFirst({
      where: eq(usage.key, session.user.id),
    });

    if (existingUsage) {
      await db
        .update(usage)
        .set({ points: existingUsage.points + BONUS_CREDITS })
        .where(eq(usage.key, session.user.id));
    }

    return Response.json({
      success: true,
      bonusCredits: BONUS_CREDITS,
      message: "Thanks for your interest! We've added 3 bonus credits to your account.",
    });
  } catch {
    return Response.json({ error: "Failed to claim bonus" }, { status: 500 });
  }
}
