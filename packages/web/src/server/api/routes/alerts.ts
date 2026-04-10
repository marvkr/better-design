import { Hono } from "hono";
import {
  alertRateLimit,
  alertAnonAbuse,
  alertMCPToolUsage,
} from "@/lib/alerts";

const app = new Hono()
  .post("/", async (c) => {
    const secret = c.req.header("x-internal-secret");
    const expected = process.env.INTERNAL_ALERT_SECRET;

    if (expected && secret !== expected) {
      return c.json({ ok: false }, 401);
    }

    const body = await c.req.json();
    const { type, ip, endpoint, label, tool, params } = body;

    switch (type) {
      case "rate-limit":
        if (["anon-create", "auth-create", "select-ds"].includes(label)) {
          await alertRateLimit(ip ?? "unknown", endpoint ?? label);
        }
        break;
      case "anon-abuse":
        await alertAnonAbuse(ip ?? "unknown", endpoint ?? "unknown");
        break;
      case "mcp-usage":
        await alertMCPToolUsage(tool ?? "unknown", params);
        break;
    }

    return c.json({ ok: true });
  });

export default app;
