/**
 * Seed design system page.tsx files into the DB.
 *
 * For each design system in the DB:
 *   - If design-systems/{id}/page.tsx exists → use that (design-system-specific)
 *   - Otherwise → use design-systems/_shared/page.tsx (universal template)
 *
 * Inserts or updates a component row with destination "app/page.tsx".
 * The scaffold step writes this file to the sandbox, so the agent never
 * generates it from scratch.
 *
 * Run with:  bunx tsx src/scripts/seed-pages.ts
 */

import fs from "node:fs";
import path from "node:path";
import { eq, and } from "drizzle-orm";
import { db, designSystemComponents } from "@/db";

const DS_DIR = path.join(process.cwd(), "../../design-systems");
const SHARED_PAGE = path.join(DS_DIR, "_shared/page.tsx");

const LAYOUT_CODE = `import "./globals.css";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={\`\${GeistSans.variable} \${GeistMono.variable} \${inter.variable}\`}>
      <body>{children}</body>
    </html>
  );
}
`;

async function main() {
  if (!fs.existsSync(SHARED_PAGE)) {
    console.error(`❌ Shared page not found at ${SHARED_PAGE}`);
    process.exit(1);
  }

  const sharedPageCode = fs.readFileSync(SHARED_PAGE, "utf-8");
  const allSystems = await db.query.designSystems.findMany({ columns: { id: true, title: true } });

  for (const ds of allSystems) {
    // Resolve page.tsx content
    const specificPage = path.join(DS_DIR, ds.id, "page.tsx");
    const pageCode = fs.existsSync(specificPage)
      ? fs.readFileSync(specificPage, "utf-8")
      : sharedPageCode;

    const isSpecific = fs.existsSync(specificPage);
    console.log(`\n${ds.title} (${ds.id}) — using ${isSpecific ? "specific" : "shared"} page.tsx`);

    // Upsert page.tsx component
    await upsertComponent(ds.id, "app/page.tsx", "page", "Pre-written component showcase page", pageCode);

    // Upsert layout.tsx component
    await upsertComponent(ds.id, "app/layout.tsx", "layout", "Standard Next.js root layout", LAYOUT_CODE);
  }

  console.log("\nDone.");
  process.exit(0);
}

async function upsertComponent(
  designSystemId: string,
  destination: string,
  name: string,
  description: string,
  code: string,
) {
  const existing = await db.query.designSystemComponents.findFirst({
    where: and(
      eq(designSystemComponents.designSystemId, designSystemId),
      eq(designSystemComponents.destination, destination),
    ),
  });

  if (existing) {
    await db
      .update(designSystemComponents)
      .set({ code })
      .where(eq(designSystemComponents.id, existing.id));
    console.log(`  ✓ Updated ${destination}`);
  } else {
    await db.insert(designSystemComponents).values({
      designSystemId,
      name,
      destination,
      description,
      code,
    });
    console.log(`  ✓ Inserted ${destination}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
