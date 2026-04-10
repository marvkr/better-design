import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { eq, and, desc } from "drizzle-orm";

import { db, projects, messages, designSystems } from "@/db";
import { inngest } from "@/inngest/client";
import { consumeCredits, consumeAnonymousCredits, getClientIP } from "@/lib/usage";

import { checkGlobalRateLimit } from "@/lib/global-rate-limit";
import { checkIPRateLimit } from "@/lib/ip-rate-limit";
import { alertAnonAbuse, alertRateLimit } from "@/lib/alerts";
import type { Variables } from "../app";
import { requireAuth } from "../app";
import { notFound, tooManyRequests, badRequest } from "../errors";

const projectsRoute = new Hono<{ Variables: Variables }>()
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const user = c.get("user");
    const isAuthenticated = !!user;

    if (isAuthenticated) {
      const existingProject = await db.query.projects.findFirst({
        where: and(eq(projects.id, id), eq(projects.userId, user!.id)),
      });
      if (!existingProject) throw notFound("Project not found");
      return c.json(existingProject);
    } else {
      const existingProject = await db.query.projects.findFirst({
        where: and(eq(projects.id, id), eq(projects.isAnonymous, true)),
      });
      if (!existingProject) throw notFound("Project not found");
      return c.json(existingProject);
    }
  })
  .get("/", async (c) => {
    const user = requireAuth(c);
    const result = await db.query.projects.findMany({
      where: eq(projects.userId, user.id),
      orderBy: desc(projects.updatedAt),
    });
    return c.json(result);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        value: z.string().min(1).max(10000),
        designSystemId: z.string().optional(),
      }),
    ),
    async (c) => {
      const user = requireAuth(c);
      const { value, designSystemId } = c.req.valid("json");

      const globalLimit = await checkGlobalRateLimit();
      if (!globalLimit.allowed) {
        throw tooManyRequests(`System is busy. Try again in ${Math.ceil(globalLimit.resetInMs / 1000)} seconds.`);
      }

      try {
        if (process.env.NODE_ENV !== "development") {
          await consumeCredits(user);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw badRequest("Something went wrong");
        } else {
          throw tooManyRequests("You have run out of credits");
        }
      }

      let iconLibraryId: string | null = null;
      let iconVariant: string | null = null;
      if (designSystemId) {
        const ds = await db.query.designSystems.findFirst({
          where: eq(designSystems.id, designSystemId),
        });
        iconLibraryId = ds?.iconLibraryId ?? "tabler";
        iconVariant = ds?.iconVariant ?? "outline";
      }

      const [createdProject] = await db
        .insert(projects)
        .values({
          userId: user.id,
          name: generateSlug(2, { format: "kebab" }),
          designSystemStatus: designSystemId ? "SELECTED" : "PENDING",
          designSystemId: designSystemId ?? null,
          iconLibraryId: iconLibraryId ?? null,
          iconVariant: iconVariant ?? null,
        })
        .returning();

      await db.insert(messages).values({
        projectId: createdProject.id,
        content: value,
        role: "USER",
        type: "RESULT",
      });

      if (designSystemId) {
        await inngest.send({
          name: "code-agent/run",
          data: { value, projectId: createdProject.id, designSystemId },
        });
      } else {
        await inngest.send({
          name: "design-system/recommend",
          data: { userMessage: value, projectId: createdProject.id },
        });
      }

      return c.json(createdProject);
    },
  )
  .post(
    "/anonymous",
    zValidator(
      "json",
      z.object({
        value: z.string().min(1).max(10000),
        designSystemId: z.string().optional(),
      }),
    ),
    async (c) => {
      // If the request already carries a valid session, refuse to create an
      // anonymous project — otherwise we'd orphan the project under
      // `anon_<ip>` and the signed-in user could never view it
      // (see /projects/[id] page lookup which scopes by userId).
      if (c.get("user")) {
        throw badRequest("Already signed in — use the authenticated endpoint");
      }

      const { value, designSystemId } = c.req.valid("json");
      const ip = getClientIP(c.req.raw.headers);

      const ipLimit = await checkIPRateLimit(ip, "anon-create", 3, 10 * 60_000);
      if (!ipLimit.allowed) {
        void alertAnonAbuse(ip, "projects.createAnonymous");
        throw tooManyRequests(`Too many requests. Try again in ${ipLimit.retryAfter} seconds.`);
      }

      const globalLimit = await checkGlobalRateLimit();
      if (!globalLimit.allowed) {
        throw tooManyRequests(`System is busy. Try again in ${Math.ceil(globalLimit.resetInMs / 1000)} seconds.`);
      }

      if (process.env.NODE_ENV !== "development") {
        try {
          await consumeAnonymousCredits(ip);
        } catch {
          throw tooManyRequests("You've used your free trial. Sign up to continue!");
        }
      }

      let anonIconLibraryId: string | null = null;
      let anonIconVariant: string | null = null;
      if (designSystemId) {
        const ds = await db.query.designSystems.findFirst({
          where: eq(designSystems.id, designSystemId),
        });
        anonIconLibraryId = ds?.iconLibraryId ?? "tabler";
        anonIconVariant = ds?.iconVariant ?? "outline";
      }

      const [createdProject] = await db
        .insert(projects)
        .values({
          userId: `anon_${ip}`,
          name: generateSlug(2, { format: "kebab" }),
          designSystemStatus: designSystemId ? "SELECTED" : "PENDING",
          designSystemId: designSystemId ?? null,
          iconLibraryId: anonIconLibraryId ?? null,
          iconVariant: anonIconVariant ?? null,
          isAnonymous: true,
        })
        .returning();

      await db.insert(messages).values({
        projectId: createdProject.id,
        content: value,
        role: "USER",
        type: "RESULT",
      });

      try {
        if (designSystemId) {
          await inngest.send({
            name: "code-agent/run",
            data: { value, projectId: createdProject.id, designSystemId },
          });
        } else {
          await inngest.send({
            name: "design-system/recommend",
            data: { userMessage: value, projectId: createdProject.id },
          });
        }
      } catch (e) {
        console.error("Failed to send Inngest event:", e);
      }

      return c.json(createdProject);
    },
  )
  .post(
    "/:id/answer-clarification",
    zValidator("json", z.object({ answer: z.string().min(1).max(2000) })),
    async (c) => {
      const { id: projectId } = c.req.param();
      const { answer } = c.req.valid("json");

      await inngest.send({
        name: "user/clarification-answer",
        data: { projectId, answer },
      });

      return c.json({ success: true });
    },
  )
  .post(
    "/:id/select-design-system",
    zValidator("json", z.object({ designSystemId: z.string().min(1) })),
    async (c) => {
      const { id: projectId } = c.req.param();
      const { designSystemId } = c.req.valid("json");
      const user = c.get("user");
      const isAuthenticated = !!user;

      const ip = getClientIP(c.req.raw.headers);
      const ipLimit = await checkIPRateLimit(ip, "select-ds", 10, 60_000);
      if (!ipLimit.allowed) {
        void alertRateLimit(ip, "projects.selectDesignSystem");
        throw tooManyRequests(`Too many requests. Try again in ${ipLimit.retryAfter} seconds.`);
      }

      let project;
      if (isAuthenticated) {
        project = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.userId, user!.id)),
        });
      } else {
        project = await db.query.projects.findFirst({
          where: and(eq(projects.id, projectId), eq(projects.isAnonymous, true)),
        });
      }

      if (!project) throw notFound("Project not found");

      const dsForUpdate = await db.query.designSystems.findFirst({
        where: eq(designSystems.id, designSystemId),
      });

      await db
        .update(projects)
        .set({
          designSystemId,
          designSystemStatus: "GENERATING",
          iconLibraryId: dsForUpdate?.iconLibraryId ?? "tabler",
          iconVariant: dsForUpdate?.iconVariant ?? "outline",
        })
        .where(eq(projects.id, projectId));

      const userMessage = await db.query.messages.findFirst({
        where: and(eq(messages.projectId, projectId), eq(messages.role, "USER")),
        orderBy: desc(messages.createdAt),
      });

      if (!userMessage) throw notFound("User message not found");

      await inngest.send({
        name: "code-agent/run",
        data: { value: userMessage.content, projectId, designSystemId },
      });

      return c.json({ success: true });
    },
  );

export default projectsRoute;
