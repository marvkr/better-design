import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "@/lib/auth";
import { inngest } from "@/inngest/client";
import { AppError, unauthorized, handleError } from "./errors";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export type Variables = {
  session: Session | null;
  user: NonNullable<Session>["user"] | null;
};

export const createApp = () =>
  new Hono<{ Variables: Variables }>()
    .use("*", async (c, next) => {
      // In Cloudflare Workers, secrets come via c.env (not process.env).
      // Sync them into process.env so libraries like better-auth can read them.
      const env = c.env as Record<string, string | undefined> | undefined;
      if (env) {
        for (const [key, value] of Object.entries(env)) {
          if (typeof value === "string" && process.env[key] === undefined) {
            process.env[key] = value;
          }
        }
        // CF Workers don't have global env — set Inngest env vars from worker bindings
        inngest.setEnvVars(env);
      }
      await next();
    })
    .use(
      "*",
      cors({
        origin: (origin) => {
          if (origin?.endsWith("better-design.com")) return origin;
          return process.env.NEXT_PUBLIC_APP_URL ?? origin ?? "*";
        },
        allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
        credentials: true,
      }),
    )
    .use("*", async (c, next) => {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });
      c.set("session", session);
      c.set("user", session?.user ?? null);
      await next();
    })
    .onError((err, c) => {
      if (err instanceof AppError) {
        return handleError(c, err);
      }
      console.error("Unhandled error:", err);
      return c.json({ code: "INTERNAL_ERROR", message: "Internal server error" }, 500);
    });

export function requireAuth(c: { get: (key: "user") => Variables["user"] }) {
  const user = c.get("user");
  if (!user) throw unauthorized();
  return user;
}
