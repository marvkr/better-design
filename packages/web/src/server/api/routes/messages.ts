import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, asc } from "drizzle-orm";

import { db, projects, messages } from "@/db";
import { inngest } from "@/inngest/client";
import { consumeCredits, consumeAnonymousCredits, getClientIP } from "@/lib/usage";
import { checkGlobalRateLimit } from "@/lib/global-rate-limit";
import type { Variables } from "../app";
import { tooManyRequests, notFound, badRequest } from "../errors";

const messagesRoute = new Hono<{ Variables: Variables }>()
  .get("/", zValidator("query", z.object({ projectId: z.string().min(1) })), async (c) => {
    const { projectId } = c.req.valid("query");
    const user = c.get("user");
    const isAuthenticated = !!user;

    const result = await db.query.messages.findMany({
      where: and(eq(messages.projectId, projectId)),
      with: {
        fragment: true,
        project: true,
      },
      orderBy: asc(messages.updatedAt),
    });

    const filtered = result.filter((msg) => {
      if (isAuthenticated) {
        return msg.project.userId === user!.id;
      } else {
        return msg.project.isAnonymous === true;
      }
    });

    return c.json(filtered.map(({ project: _project, ...msg }) => msg));
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        value: z.string().min(1).max(10000),
        projectId: z.string().min(1),
      }),
    ),
    async (c) => {
      const { value, projectId } = c.req.valid("json");
      const user = c.get("user");
      const isAuthenticated = !!user;

      const globalLimit = await checkGlobalRateLimit();
      if (!globalLimit.allowed) {
        throw tooManyRequests(
          `System is busy. Try again in ${Math.ceil(globalLimit.resetInMs / 1000)} seconds.`,
        );
      }

      const ip = getClientIP(c.req.raw.headers);

      if (isAuthenticated) {
        const existingProject = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.userId, user!.id)),
        });

        if (!existingProject) throw notFound("Project not found");

        try {
          await consumeCredits(user!);
        } catch (error) {
          if (error instanceof Error) {
            throw badRequest("Something went wrong");
          } else {
            throw tooManyRequests("You have run out of credits");
          }
        }
      } else {
        const existingProject = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.isAnonymous, true)),
        });

        if (!existingProject) throw notFound("Project not found");

        try {
          await consumeAnonymousCredits(ip);
        } catch {
          throw tooManyRequests("You've used your free trial. Sign up to continue!");
        }
      }

      const [createdMessage] = await db
        .insert(messages)
        .values({
          projectId,
          content: value,
          role: "USER",
          type: "RESULT",
        })
        .returning();

      await inngest.send({
        name: "code-agent/run",
        data: { value, projectId },
      });

      return c.json(createdMessage);
    },
  );

export default messagesRoute;
