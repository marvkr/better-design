/**
 * Sync design system component files from filesystem into the DB.
 *
 * For each design system in the DB:
 *   - Reads design-systems/{id}/globals.css → upserts as name="globals" → app/globals.css
 *   - Reads design-systems/{id}/utils.ts    → upserts as name="lib-utils" → lib/utils.ts
 *   - Reads design-systems/{id}/components/*.tsx and *.ts
 *       → upserts each as name=filename(sans ext) → components/ui/<filename>
 *   - Deletes any DB rows (excluding "page" and "layout") that no longer exist on disk
 *
 * Run with:  bun src/scripts/sync-design-system-components.ts
 * To sync one system: bun src/scripts/sync-design-system-components.ts supabase
 */

import fs from "node:fs";
import path from "node:path";
import { eq, and } from "drizzle-orm";
import { db, designSystemComponents } from "@/db";

const DS_DIR = path.join(process.cwd(), "../../design-systems");

// These names are managed by seed-pages.ts — never delete them
const EXTERNALLY_MANAGED = new Set(["page", "layout"]);

// Component files in <ds>/components/ with these extensions get synced to components/ui/
const COMPONENT_EXTENSIONS = [".tsx", ".ts"];

async function upsert(
  designSystemId: string,
  name: string,
  destination: string,
  code: string,
) {
  const existing = await db.query.designSystemComponents.findFirst({
    where: and(
      eq(designSystemComponents.designSystemId, designSystemId),
      eq(designSystemComponents.name, name),
    ),
  });

  if (existing) {
    await db
      .update(designSystemComponents)
      .set({ code, destination })
      .where(eq(designSystemComponents.id, existing.id));
    console.log(`  ✓ updated  ${destination}`);
  } else {
    await db.insert(designSystemComponents).values({
      designSystemId,
      name,
      destination,
      code,
    });
    console.log(`  ✓ inserted ${destination}`);
  }
}

async function syncOne(dsId: string) {
  const dsDir = path.join(DS_DIR, dsId);
  if (!fs.existsSync(dsDir)) {
    console.log(`  ⚠ directory not found: ${dsDir}`);
    return;
  }

  const synced = new Set<string>();

  // globals.css → app/globals.css
  const globalsPath = path.join(dsDir, "globals.css");
  if (fs.existsSync(globalsPath)) {
    await upsert(dsId, "globals", "app/globals.css", fs.readFileSync(globalsPath, "utf-8"));
    synced.add("globals");
  } else {
    console.log(`  – no globals.css`);
  }

  // utils.ts → lib/utils.ts (per-DS cn() helper)
  const utilsPath = path.join(dsDir, "utils.ts");
  if (fs.existsSync(utilsPath)) {
    await upsert(dsId, "lib-utils", "lib/utils.ts", fs.readFileSync(utilsPath, "utf-8"));
    synced.add("lib-utils");
  } else {
    console.log(`  – no utils.ts`);
  }

  // components/*.tsx and components/*.ts → components/ui/<filename>
  const componentsDir = path.join(dsDir, "components");
  if (fs.existsSync(componentsDir)) {
    const files = fs
      .readdirSync(componentsDir)
      .filter((f) => COMPONENT_EXTENSIONS.some((ext) => f.endsWith(ext)));
    for (const file of files) {
      const ext = path.extname(file);
      const name = file.slice(0, -ext.length);
      const destination = `components/ui/${file}`;
      const code = fs.readFileSync(path.join(componentsDir, file), "utf-8");
      await upsert(dsId, name, destination, code);
      synced.add(name);
    }
  } else {
    console.log(`  – no components/ directory`);
  }

  // Delete stale rows (names not found on disk, excluding externally managed)
  const allExisting = await db.query.designSystemComponents.findMany({
    where: eq(designSystemComponents.designSystemId, dsId),
    columns: { id: true, name: true },
  });

  const stale = allExisting.filter(
    (row) => !EXTERNALLY_MANAGED.has(row.name) && !synced.has(row.name),
  );

  for (const row of stale) {
    await db
      .delete(designSystemComponents)
      .where(eq(designSystemComponents.id, row.id));
    console.log(`  ✗ deleted  stale: ${row.name}`);
  }
}

async function main() {
  const targetId = process.argv[2];

  if (targetId) {
    console.log(`\nSyncing ${targetId}...`);
    await syncOne(targetId);
  } else {
    const allSystems = await db.query.designSystems.findMany({
      columns: { id: true, title: true },
    });
    console.log(`Found ${allSystems.length} design systems in DB\n`);
    for (const ds of allSystems) {
      console.log(`${ds.title} (${ds.id})`);
      await syncOne(ds.id);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
