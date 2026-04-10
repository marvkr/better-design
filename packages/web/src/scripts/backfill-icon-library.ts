import { db, projects } from "@/db";
import { isNull, sql } from "drizzle-orm";

async function backfill() {
  const result = await db
    .update(projects)
    .set({ iconLibraryId: "tabler", iconVariant: "outline" })
    .where(isNull(projects.iconLibraryId));

  console.log("Backfilled projects with icon_library_id = 'tabler'");
  process.exit(0);
}

backfill().catch(e => { console.error(e); process.exit(1); });
