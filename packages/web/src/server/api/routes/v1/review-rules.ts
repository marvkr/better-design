import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getReviewRules } from "@/lib/foundational-docs";
import { requireApiKey, rateLimit, type ApiKeyVariables } from "./middleware";

const reviewRulesRoute = new Hono<{ Variables: ApiKeyVariables }>()
  .use("*", requireApiKey)
  .get(
    "/",
    rateLimit("v1-review-rules", 60, 60_000),
    zValidator("query", z.object({ category: z.enum(["accessibility", "visual-design", "all"]).optional() })),
    async (c) => {
      const { category = "all" } = c.req.valid("query");
      const rules = await getReviewRules();
      const filtered =
        category === "all"
          ? rules
          : rules.filter((r) => r.id.toLowerCase().includes(category.toLowerCase()));
      return c.json({ rules: filtered });
    },
  );

export default reviewRulesRoute;
