import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { waitlist as waitlistTable } from "@/db/schema";
import { alertWaitlistSignup } from "@/lib/alerts";
import { getPostHog } from "@/lib/posthog";
import type { Variables } from "../app";

const MAX_SPOTS = 100;

const waitlistRoute = new Hono<{ Variables: Variables }>()
  .post(
    "/join",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        name: z.string().min(1).optional(),
        source: z.string().optional(),
      }),
    ),
    async (c) => {
      const { email, name, source } = c.req.valid("json");

      const currentCount = await db
        .select({ count: count() })
        .from(waitlistTable)
        .then((result) => result[0]?.count ?? 0);

      if (currentCount >= MAX_SPOTS) {
        const full: { success: boolean; spotsLeft: number; message: string } = {
          success: false,
          spotsLeft: 0,
          message: "Waitlist is full",
        };
        return c.json(full);
      }

      await db
        .insert(waitlistTable)
        .values({ email, name, source: source ?? "homepage" })
        .onConflictDoNothing();

      alertWaitlistSignup(email).catch(() => {});

      try {
        getPostHog().capture({
          distinctId: email,
          event: "waitlist_joined",
          properties: { email, name, source },
        });
      } catch {}

      const newCount = await db
        .select({ count: count() })
        .from(waitlistTable)
        .then((result) => result[0]?.count ?? 0);

      const joined: { success: boolean; spotsLeft: number; message: string } = {
        success: true,
        spotsLeft: Math.max(0, MAX_SPOTS - newCount),
        message: "Successfully joined the waitlist",
      };
      return c.json(joined);
    },
  )
  .get("/spots-left", async (c) => {
    const currentCount = await db
      .select({ count: count() })
      .from(waitlistTable)
      .then((result) => result[0]?.count ?? 0);

    return c.json({ spotsLeft: Math.max(0, MAX_SPOTS - currentCount) });
  });

export default waitlistRoute;
