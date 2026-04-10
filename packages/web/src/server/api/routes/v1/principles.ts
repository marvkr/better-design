import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  listFoundationalDocs,
  searchFoundationalDocs,
  getFoundationalDocById,
} from "@/lib/foundational-docs";
import { requireApiKey, rateLimit, type ApiKeyVariables } from "./middleware";
import { notFound } from "../../errors";

const principlesRoute = new Hono<{ Variables: ApiKeyVariables }>()
  .use("*", requireApiKey)
  .get(
    "/",
    rateLimit("v1-principles-list", 60, 60_000),
    async (c) => {
      const docs = await listFoundationalDocs();
      const principles = docs.filter((d) => d.id.startsWith("principle-"));
      return c.json({ principles });
    },
  )
  .get(
    "/search",
    rateLimit("v1-principles-search", 30, 60_000),
    zValidator("query", z.object({ q: z.string().min(1), limit: z.coerce.number().min(1).max(10).optional() })),
    async (c) => {
      const { q, limit = 5 } = c.req.valid("query");
      const results = await searchFoundationalDocs(q, limit);
      return c.json({ results });
    },
  )
  .get(
    "/:topic",
    rateLimit("v1-principles-get", 60, 60_000),
    async (c) => {
      const { topic } = c.req.param();
      const doc = await getFoundationalDocById(`principle-${topic}`);
      if (!doc) throw notFound("Principle not found");
      return c.json(doc);
    },
  );

export default principlesRoute;
