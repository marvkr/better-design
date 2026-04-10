import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env") });

import { neon } from "@neondatabase/serverless";

async function checkDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const sql = neon(databaseUrl);

  console.log("Querying all foundational docs...\n");

  const results = await sql`
    SELECT id, title, LENGTH(content) as content_length
    FROM foundational_docs
    ORDER BY id
  `;

  console.log(`Total documents: ${results.length}\n`);

  // Group by prefix
  const grouped: Record<string, typeof results> = {};
  for (const row of results) {
    const prefix = (row.id as string).split("-")[0];
    if (!grouped[prefix]) {
      grouped[prefix] = [];
    }
    grouped[prefix].push(row);
  }

  for (const [prefix, docs] of Object.entries(grouped)) {
    console.log(`\n${prefix.toUpperCase()} (${docs.length} docs):`);
    for (const doc of docs) {
      console.log(`  - ${doc.id}: ${doc.title} (${doc.content_length} chars)`);
    }
  }

  // Check for sound-specific docs
  console.log("\n\nSOUND DESIGN DOCS:");
  const soundDocs = results.filter((r) => (r.id as string).startsWith("sound-"));
  if (soundDocs.length > 0) {
    for (const doc of soundDocs) {
      console.log(`  ✓ ${doc.id}: ${doc.title} (${doc.content_length} chars)`);
    }
  } else {
    console.log("  ✗ No sound design docs found");
  }
}

checkDatabase().catch((error) => {
  console.error("Error checking database:", error);
  process.exit(1);
});
