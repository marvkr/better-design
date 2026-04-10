import { Hono } from "hono";
import type { Variables } from "../app";
import { getUsageStatus, getAnonymousUsageStatus, getClientIP } from "@/lib/usage";

const usage = new Hono<{ Variables: Variables }>().get("/status", async (c) => {
  try {
    const user = c.get("user");
    if (user) {
      const status = await getUsageStatus(user);
      return c.json(status);
    } else {
      const ip = getClientIP(c.req.raw.headers);
      const status = await getAnonymousUsageStatus(ip);
      return c.json(status);
    }
  } catch {
    return c.json(null);
  }
});

export default usage;
