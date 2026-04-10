import { db } from "@/db";
import { projectEvents } from "@/db/schema";

export type ProjectEventType =
  | "step"
  | "file"
  | "agent_action"
  | "text_delta"
  | "complete"
  | "error";

export async function emitProjectEvent(
  projectId: string,
  eventType: ProjectEventType,
  data: Record<string, unknown>,
): Promise<void> {
  await db.insert(projectEvents).values({ projectId, eventType, data });
}
