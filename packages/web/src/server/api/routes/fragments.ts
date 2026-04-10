import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { db, fragments, designConfigSchema } from "@/db";
import type { Variables } from "../app";
import { notFound } from "../errors";

const fragmentsRoute = new Hono<{ Variables: Variables }>()
  .get("/:id/config", async (c) => {
    const { id: fragmentId } = c.req.param();
    const fragment = await db.query.fragments.findFirst({
      where: eq(fragments.id, fragmentId),
    });
    return c.json(fragment?.config ?? null);
  })
  .patch(
    "/:id/config",
    zValidator("json", z.object({ config: designConfigSchema })),
    async (c) => {
      const { id: fragmentId } = c.req.param();
      const { config } = c.req.valid("json");

      const existing = await db.query.fragments.findFirst({
        where: eq(fragments.id, fragmentId),
      });

      if (!existing) throw notFound("Fragment not found");

      const mergedConfig = {
        ...existing.config,
        ...config,
        colors: { ...existing.config?.colors, ...config.colors },
        font: { ...existing.config?.font, ...config.font },
        icons: { ...existing.config?.icons, ...config.icons },
      };

      const [updated] = await db
        .update(fragments)
        .set({ config: mergedConfig, updatedAt: new Date() })
        .where(eq(fragments.id, fragmentId))
        .returning();

      return c.json(updated);
    },
  )

export default fragmentsRoute;
