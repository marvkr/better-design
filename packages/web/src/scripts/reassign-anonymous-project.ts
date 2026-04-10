// Inspect or reassign an orphaned anonymous project to a real user.
//
// Background: prior to the session-loading fix in project-form.tsx, a
// signed-in user could submit before their session hydrated and end up
// hitting POST /api/projects/anonymous, which created the project under
// `userId: anon_<ip>` with `isAnonymous: true`. The /projects/[id] page
// then refused to show it because the lookup is scoped by userId.
//
// Usage:
//   bun run src/scripts/reassign-anonymous-project.ts <projectId>
//     → inspect only (prints current state + first message)
//
//   bun run src/scripts/reassign-anonymous-project.ts <projectId> <userEmail>
//     → dry run: shows what the reassignment would look like
//
//   bun run src/scripts/reassign-anonymous-project.ts <projectId> <userEmail> --apply
//     → actually reassigns the project to that user
//
// The script refuses to touch projects that aren't `is_anonymous = true`,
// so it can't accidentally clobber an authenticated user's project.

import { eq } from "drizzle-orm";
import { db, projects, messages, user } from "@/db";

async function main() {
  const [projectId, userEmail, applyFlag] = process.argv.slice(2);
  const apply = applyFlag === "--apply";

  if (!projectId) {
    console.error("Usage: reassign-anonymous-project <projectId> [userEmail] [--apply]");
    process.exit(1);
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project) {
    console.error(`Project ${projectId} not found`);
    process.exit(1);
  }

  const firstMessage = await db.query.messages.findFirst({
    where: eq(messages.projectId, projectId),
  });

  console.log("--- Project ---");
  console.log({
    id: project.id,
    name: project.name,
    userId: project.userId,
    isAnonymous: project.isAnonymous,
    designSystemId: project.designSystemId,
    createdAt: project.createdAt,
    firstMessage: firstMessage?.content?.slice(0, 120),
  });

  if (!userEmail) {
    console.log("\nNo target email provided — inspect only. Done.");
    process.exit(0);
  }

  if (!project.isAnonymous) {
    console.error(
      `\nRefusing to reassign: project is not anonymous (userId=${project.userId}).`,
    );
    process.exit(1);
  }

  const targetUser = await db.query.user.findFirst({
    where: eq(user.email, userEmail),
  });

  if (!targetUser) {
    console.error(`\nUser with email ${userEmail} not found`);
    process.exit(1);
  }

  console.log("\n--- Reassignment plan ---");
  console.log({
    from: { userId: project.userId, isAnonymous: project.isAnonymous },
    to: { userId: targetUser.id, isAnonymous: false, email: targetUser.email },
  });

  if (!apply) {
    console.log("\nDry run. Re-run with --apply to actually update the row.");
    process.exit(0);
  }

  await db
    .update(projects)
    .set({ userId: targetUser.id, isAnonymous: false })
    .where(eq(projects.id, projectId));

  console.log("\nDone. Project reassigned.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
