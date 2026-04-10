import { Sandbox } from "@e2b/code-interpreter";
import { db, fragments, messages, projects } from "@/db";
import { eq } from "drizzle-orm";

const PROJECT_ID = "d74c2df9-8eba-4cad-8844-61d1c9c33137";

async function patch() {
  // Find the fragment for this project via messages
  const projectMessages = await db.query.messages.findMany({
    where: eq(messages.projectId, PROJECT_ID),
    with: { fragment: true },
  });

  const fragment = projectMessages.map(m => m.fragment).find(f => f != null);
  if (!fragment) { console.log("No fragment found"); process.exit(1); }

  console.log("Fragment:", fragment.id);
  console.log("Sandbox URL:", fragment.sandboxUrl);

  const match = fragment.sandboxUrl.match(/3000-([^.]+)\.e2b\.app/);
  if (!match) { console.log("Can't parse sandbox ID"); process.exit(1); }
  const sandboxId = match[1];

  // Build corrected globals.css
  const files = fragment.files as Record<string, string>;
  const existingGlobals = files["app/globals.css"] ?? "";
  const fixed = existingGlobals.includes("@import \"tailwindcss\"")
    ? existingGlobals  // already correct
    : `@import "tailwindcss";\n@import "tw-animate-css";\n@plugin "@tailwindcss/typography";\n\n` + existingGlobals.replace(/@tailwind\s+\w+;?\s*/g, "").trim();

  console.log("Patching sandbox:", sandboxId);
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.files.write("app/globals.css", fixed);
  console.log("Done ✓");
  process.exit(0);
}

patch().catch(e => { console.error(e); process.exit(1); });
