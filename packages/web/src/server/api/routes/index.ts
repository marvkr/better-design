import { serve } from "inngest/hono";
import { createApp } from "../app";
import usage from "./usage";
import waitlistRoute from "./waitlist";
import messagesRoute from "./messages";
import projectsRoute from "./projects";
import fragmentsRoute from "./fragments";
import apiKeysRoute from "./api-keys";
import eventsRoute from "./events";
import invitesRoute from "./invites";
import { v1Router } from "./v1/index";
import { mcpRoute } from "./mcp";
import alertsRoute from "./alerts";
import claimBonusRoute from "./claim-bonus";
import { auth } from "@/lib/auth";
import { inngest } from "@/inngest/client";
import { codeAgentFunction, designSystemRecommenderFunction } from "@/inngest/functions";

export const api = createApp()
  .basePath("/api")
  .get("/.well-known/oauth-authorization-server", (c) =>
    c.json({ error: "oauth_not_supported" }, 404),
  )
  .route("/usage", usage)
  .route("/waitlist", waitlistRoute)
  .route("/messages", messagesRoute)
  .route("/projects", projectsRoute)
  .route("/fragments", fragmentsRoute)
  .route("/api-keys", apiKeysRoute)
  .route("/events", eventsRoute)
  .route("/invites", invitesRoute)
  .route("/v1", v1Router)
  .route("/mcp", mcpRoute)
  .route("/internal/alert", alertsRoute)
  .route("/claim-bonus", claimBonusRoute)
  .on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw))
  .use("/inngest", async (c) => {
    const env = (c.env ?? {}) as Record<string, string>;
    const handler = serve({
      client: inngest,
      functions: [codeAgentFunction, designSystemRecommenderFunction],
      ...(env.INNGEST_SERVE_HOST ? { serveHost: env.INNGEST_SERVE_HOST } : {}),
    });
    return handler(c);
  });

export type ApiType = typeof api;
