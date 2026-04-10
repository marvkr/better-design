import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", "web", ".env") });

import { neon } from "@neondatabase/serverless";

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: {
          parts: [{ text }],
        },
        outputDimensionality: 768,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Gemini API error: ${response.status} ${response.statusText} - ${error}`
    );
  }

  const data = await response.json();
  return data.embedding.values;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function reindexEmbeddings() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const sql = neon(databaseUrl);

  console.log("Starting embedding reindex with gemini-embedding-001...\n");

  // 1. Reindex design systems
  console.log("📦 Reindexing design systems...");
  const designSystems = await sql`
    SELECT id, title, description, raw_content
    FROM design_systems
    ORDER BY title
  `;

  for (const ds of designSystems) {
    console.log(`  - ${ds.title}...`);
    const text = `${ds.title} ${ds.description} ${ds.raw_content}`;
    const embedding = await generateEmbedding(text);
    const vectorStr = `[${embedding.join(",")}]`;

    await sql`
      UPDATE design_systems
      SET embedding = ${vectorStr}::vector
      WHERE id = ${ds.id}
    `;
    console.log(`    ✓ Updated`);
    await sleep(1000); // Rate limit: 1 request per second
  }

  // 2. Reindex foundational docs
  console.log("\n📚 Reindexing foundational docs...");
  const foundationalDocs = await sql`
    SELECT id, title, content
    FROM foundational_docs
    ORDER BY id
  `;

  for (const doc of foundationalDocs) {
    console.log(`  - ${doc.id}...`);
    const text = `${doc.title} ${doc.content}`;
    const embedding = await generateEmbedding(text);
    const vectorStr = `[${embedding.join(",")}]`;

    await sql`
      UPDATE foundational_docs
      SET embedding = ${vectorStr}::vector
      WHERE id = ${doc.id}
    `;
    console.log(`    ✓ Updated`);
    await sleep(1000); // Rate limit: 1 request per second
  }

  // 3. Reindex icon libraries
  console.log("\n🎨 Reindexing icon libraries...");
  const iconLibraries = await sql`
    SELECT id, name, description
    FROM icon_libraries
    ORDER BY name
  `;

  for (const lib of iconLibraries) {
    console.log(`  - ${lib.name}...`);
    const text = `${lib.name} ${lib.description || ''}`;
    const embedding = await generateEmbedding(text);
    const vectorStr = `[${embedding.join(",")}]`;

    await sql`
      UPDATE icon_libraries
      SET embedding = ${vectorStr}::vector
      WHERE id = ${lib.id}
    `;
    console.log(`    ✓ Updated`);
    await sleep(1000); // Rate limit: 1 request per second
  }

  console.log("\n✅ Reindexing complete!");
  console.log(`   - ${designSystems.length} design systems`);
  console.log(`   - ${foundationalDocs.length} foundational docs`);
  console.log(`   - ${iconLibraries.length} icon libraries`);
}

reindexEmbeddings().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
