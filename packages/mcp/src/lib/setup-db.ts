import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env") });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  console.log("Setting up database schema...");

  // Enable pgvector extension
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  console.log("✓ pgvector extension enabled");

  // Create design_systems table
  await sql`
    CREATE TABLE IF NOT EXISTS design_systems (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      personality TEXT[] NOT NULL,
      industry TEXT[] NOT NULL,
      component_count INTEGER DEFAULT 0,
      primary_color TEXT,
      border_radius TEXT,
      font TEXT,
      raw_content TEXT NOT NULL,
      embedding vector(768),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ design_systems table created");

  // Create components table
  await sql`
    CREATE TABLE IF NOT EXISTS components (
      id SERIAL PRIMARY KEY,
      design_system_id TEXT REFERENCES design_systems(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      use_cases TEXT[],
      language TEXT,
      destination TEXT,
      code TEXT NOT NULL
    )
  `;
  console.log("✓ components table created");

  // Create foundational_docs table
  await sql`
    CREATE TABLE IF NOT EXISTS foundational_docs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      embedding vector(768),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ foundational_docs table created");

  // Create icon_libraries table
  await sql`
    CREATE TABLE IF NOT EXISTS icon_libraries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      prefix TEXT NOT NULL,
      icon_count INTEGER,
      license TEXT,
      category TEXT,
      tags TEXT[] NOT NULL,
      description TEXT,
      variants TEXT[],
      default_variant TEXT,
      variant_format TEXT,
      embedding vector(768),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ icon_libraries table created");

  // Create index for vector similarity search
  // Using HNSW for better performance (ivfflat requires training data)
  await sql`
    CREATE INDEX IF NOT EXISTS design_systems_embedding_idx
    ON design_systems
    USING hnsw (embedding vector_cosine_ops)
  `;
  console.log("✓ design_systems vector index created");

  await sql`
    CREATE INDEX IF NOT EXISTS icon_libraries_embedding_idx
    ON icon_libraries
    USING hnsw (embedding vector_cosine_ops)
  `;
  console.log("✓ icon_libraries vector index created");

  console.log("\nDatabase setup complete!");
}

setupDatabase().catch((err) => {
  console.error("Failed to setup database:", err);
  process.exit(1);
});
