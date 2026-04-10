import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { searchIconLibraries, getIconLibraryById, searchIconsInLibrary } from "@/lib/icon-libraries";
import { requireApiKey, rateLimit, type ApiKeyVariables } from "./middleware";
import { notFound } from "../../errors";

const iconLibrariesRoute = new Hono<{ Variables: ApiKeyVariables }>()
  .use("*", requireApiKey)
  .get(
    "/search",
    rateLimit("v1-icons-search", 30, 60_000),
    zValidator("query", z.object({ q: z.string().min(1), limit: z.coerce.number().min(1).max(10).optional() })),
    async (c) => {
      const { q, limit = 5 } = c.req.valid("query");
      const results = await searchIconLibraries(q, limit);
      return c.json({ results });
    },
  )
  .get(
    "/:id/icons",
    rateLimit("v1-icons-get", 60, 60_000),
    zValidator("query", z.object({ q: z.string().min(1), variant: z.string().optional(), limit: z.coerce.number().min(1).max(50).optional() })),
    async (c) => {
      const { id } = c.req.param();
      const { q, variant, limit = 10 } = c.req.valid("query");
      const library = await getIconLibraryById(id);
      if (!library) throw notFound("Icon library not found");
      const icons = await searchIconsInLibrary(q, library, variant, limit);
      return c.json({ icons, library: { id: library.id, name: library.name, prefix: library.prefix } });
    },
  );

export default iconLibrariesRoute;
