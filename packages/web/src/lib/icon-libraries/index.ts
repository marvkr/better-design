import { eq, sql } from "drizzle-orm";
import { db, iconLibraries, type IconLibrary } from "@/db";
import { generateQueryEmbedding } from "../design-systems/embeddings";

export interface IconLibrarySearchResult {
  id: string;
  name: string;
  prefix: string;
  category: string | null;
  tags: string[];
  description: string | null;
  variants: string[] | null;
  defaultVariant: string | null;
  iconCount: number | null;
  matchScore: number;
}

/**
 * Semantic search for icon libraries matching a style/personality query
 */
export async function searchIconLibraries(
  query: string,
  limit = 3
): Promise<IconLibrarySearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  const results = await db.execute(sql`
    SELECT
      id,
      name,
      prefix,
      category,
      tags,
      description,
      variants,
      default_variant,
      icon_count,
      1 - (embedding <=> ${vectorStr}::vector) as similarity
    FROM icon_libraries
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::vector
    LIMIT ${limit}
  `);

  type Row = {
    id: string;
    name: string;
    prefix: string;
    category: string | null;
    tags: string[];
    description: string | null;
    variants: string[] | null;
    default_variant: string | null;
    icon_count: number | null;
    similarity: number;
  };

  const rows = (results as unknown as { rows: Row[] }).rows;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    prefix: row.prefix,
    category: row.category,
    tags: row.tags,
    description: row.description,
    variants: row.variants,
    defaultVariant: row.default_variant,
    iconCount: row.icon_count,
    matchScore: Math.round(row.similarity * 100),
  }));
}

/**
 * Get an icon library by ID
 */
export async function getIconLibraryById(
  id: string
): Promise<IconLibrary | null> {
  const library = await db.query.iconLibraries.findFirst({
    where: eq(iconLibraries.id, id),
  });

  return library || null;
}

/**
 * Format icon library info for AI prompt consumption
 */
export function formatIconLibraryForPrompt(library: IconLibrary): string {
  const sections: string[] = [
    `## Icon Library: ${library.name}`,
    "",
    `**Prefix:** ${library.prefix}`,
    `**Style:** ${library.tags.join(", ")}`,
  ];

  if (library.description) {
    sections.push(`**Description:** ${library.description}`);
  }

  if (library.variants && library.variants.length > 0) {
    sections.push(`**Available Variants:** ${library.variants.join(", ")}`);
    sections.push(`**Default Variant:** ${library.defaultVariant || library.variants[0]}`);
  }

  if (library.iconCount) {
    sections.push(`**Icon Count:** ${library.iconCount}`);
  }

  sections.push("");
  sections.push("### Usage");
  sections.push(`Import: \`import { Icon } from "@iconify/react";\``);
  sections.push(`Use: \`<Icon icon="${library.prefix}:icon-name" />\``);

  return sections.join("\n");
}

/**
 * Format icon name with the correct variant suffix
 */
export function formatIconWithVariant(
  iconName: string,
  library: IconLibrary,
  variant?: string
): string {
  const actualVariant = variant || library.defaultVariant;

  // If no variant or default variant, return as-is
  if (!actualVariant || actualVariant === "default" || actualVariant === "regular") {
    return iconName;
  }

  // Check if icon already has variant suffix
  if (library.variants?.some(v => iconName.endsWith(`-${v}`))) {
    return iconName;
  }

  // Apply variant format based on library pattern
  // Most libraries use: prefix:icon-variant
  return `${iconName}-${actualVariant}`;
}

/**
 * Search Iconify API for icons in a specific library
 */
export async function searchIconsInLibrary(
  query: string,
  library: IconLibrary,
  variant?: string,
  limit = 10
): Promise<string[]> {
  const url = `https://api.iconify.design/search?query=${encodeURIComponent(query)}&prefix=${library.prefix}&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Iconify API error: ${response.status}`);
  }

  const data = await response.json() as { icons: string[] };

  // Format icons with the correct variant
  return data.icons.map(icon => formatIconWithVariant(icon, library, variant));
}

/**
 * Format search results for AI prompt consumption
 */
export function formatIconSearchResults(
  icons: string[],
  library: IconLibrary,
  variant?: string
): string {
  const actualVariant = variant || library.defaultVariant || "default";

  if (icons.length === 0) {
    return `No icons found in ${library.name}.`;
  }

  const lines = [
    `Found ${icons.length} icons in ${library.name} (${actualVariant} style):`,
    "",
    ...icons.map(icon => `- \`<Icon icon="${icon}" />\``),
  ];

  return lines.join("\n");
}
