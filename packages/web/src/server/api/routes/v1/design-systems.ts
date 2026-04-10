import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { searchDesignSystems, getDesignSystemById } from "@/lib/design-systems";
import { requireApiKey, rateLimit, type ApiKeyVariables } from "./middleware";
import { notFound } from "../../errors";

const designSystemsRoute = new Hono<{ Variables: ApiKeyVariables }>()
  .use("*", requireApiKey)
  .get(
    "/search",
    rateLimit("v1-ds-search", 30, 60_000),
    zValidator("query", z.object({ q: z.string().min(1), limit: z.coerce.number().min(1).max(10).optional() })),
    async (c) => {
      const { q, limit = 5 } = c.req.valid("query");
      const results = await searchDesignSystems(q, limit);
      return c.json({ results });
    },
  )
  .get(
    "/:id",
    rateLimit("v1-ds-get", 60, 60_000),
    async (c) => {
      const { id } = c.req.param();
      const system = await getDesignSystemById(id);
      if (!system) throw notFound("Design system not found");
      return c.json({ metadata: system.metadata, componentCount: system.components.length });
    },
  )
  .get(
    "/:id/components",
    rateLimit("v1-ds-get", 60, 60_000),
    zValidator("query", z.object({ names: z.string().optional() })),
    async (c) => {
      const { id } = c.req.param();
      const { names } = c.req.valid("query");
      const system = await getDesignSystemById(id);
      if (!system) throw notFound("Design system not found");

      const nameFilter = names ? names.split(",").map((n) => n.trim()) : null;
      const components = nameFilter
        ? system.components.filter((comp) => nameFilter.includes(comp.name))
        : system.components;

      return c.json({ components });
    },
  );

export default designSystemsRoute;
