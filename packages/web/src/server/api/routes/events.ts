import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { and, eq, gt } from "drizzle-orm";

import { db } from "@/db";
import { projectEvents, projects } from "@/db/schema";
import type { Variables } from "../app";

const eventsRoute = new Hono<{ Variables: Variables }>().get(
  "/:projectId/stream",
  async (c) => {
    const { projectId } = c.req.param();
    const user = c.get("user");

    // Auth: allow authenticated users or anonymous projects
    let project;
    try {
      if (user) {
        project = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.userId, user.id)),
        });
      } else {
        project = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.isAnonymous, true)),
        });
      }
    } catch {
      return c.json({ error: "Not found" }, 404);
    }

    if (!project) {
      return c.json({ error: "Not found" }, 404);
    }

    // Parse Last-Event-ID for reconnection
    const lastEventIdHeader = c.req.header("Last-Event-ID");
    let cursor = lastEventIdHeader ? parseInt(lastEventIdHeader, 10) : 0;
    if (isNaN(cursor)) cursor = 0;

    return streamSSE(c, async (stream) => {
      let done = false;

      while (!done) {
        // Poll for new events since cursor
        const events = await db
          .select()
          .from(projectEvents)
          .where(
            and(
              eq(projectEvents.projectId, projectId),
              gt(projectEvents.id, cursor),
            ),
          )
          .orderBy(projectEvents.id)
          .limit(50);

        for (const event of events) {
          cursor = event.id;

          await stream.writeSSE({
            id: String(event.id),
            event: event.eventType,
            data: JSON.stringify(event.data),
          });

          if (event.eventType === "complete" || event.eventType === "error") {
            done = true;
            break;
          }
        }

        if (!done) {
          await stream.sleep(500);
        }
      }
    });
  },
);

export default eventsRoute;
