import { eq, sql, isNotNull } from "drizzle-orm";
import {
  db,
  designSystems,
  designSystemComponents,
  type DesignSystem,
  type DesignSystemComponent,
} from "@/db";
import { generateQueryEmbedding } from "./embeddings";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number | null;
  matchScore: number;
}

export interface DesignSystemWithComponents {
  metadata: DesignSystem;
  components: DesignSystemComponent[];
}

export async function searchDesignSystems(
  query: string,
  limit: number = 3,
): Promise<SearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  const results = await db
    .select({
      id: designSystems.id,
      title: designSystems.title,
      description: designSystems.description,
      personality: designSystems.personality,
      industry: designSystems.industry,
      componentCount: designSystems.componentCount,
      similarity: sql<number>`1 - (embedding <=> ${vectorStr}::vector)`,
    })
    .from(designSystems)
    .where(isNotNull(designSystems.embedding))
    .orderBy(sql`embedding <=> ${vectorStr}::vector`)
    .limit(limit);

  return results.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    personality: row.personality,
    industry: row.industry,
    componentCount: row.componentCount,
    matchScore: Math.round(row.similarity * 100),
  }));
}

export async function getDesignSystemById(
  id: string,
): Promise<DesignSystemWithComponents | null> {
  const system = await db.query.designSystems.findFirst({
    where: eq(designSystems.id, id),
  });

  if (!system) {
    return null;
  }

  const components = await db.query.designSystemComponents.findMany({
    where: eq(designSystemComponents.designSystemId, id),
  });

  return {
    metadata: system,
    components,
  };
}

export function formatDesignSystemForPrompt(
  ds: DesignSystemWithComponents,
): string {
  const { metadata, components } = ds;

  const sections: string[] = [
    `## Design System: ${metadata.title}`,
    "",
    `**Description:** ${metadata.description}`,
    `**Personality:** ${metadata.personality.join(", ")}`,
    `**Industry:** ${metadata.industry.join(", ")}`,
  ];

  if (metadata.primaryColor) {
    sections.push(`**Primary Color:** ${metadata.primaryColor}`);
  }
  if (metadata.borderRadius) {
    sections.push(`**Border Radius:** ${metadata.borderRadius}`);
  }
  if (metadata.font) {
    sections.push(`**Font:** ${metadata.font}`);
  }

  sections.push("");
  sections.push("### Design Principles");
  sections.push(metadata.rawContent);

  // Only "themed component" rows belong in the prompt listing — filter out infra
  // rows (globals.css, lib/utils.ts, app/page.tsx, app/layout.tsx, etc.)
  const overrideComponents = components.filter(
    (c) => c.destination?.startsWith("components/ui/") ?? false,
  );
  if (overrideComponents.length > 0) {
    sections.push("");
    sections.push("### Available Themed Components");
    sections.push(
      "These components are already scaffolded in components/ui/ with design system styling applied:",
    );
    sections.push("");
    for (const component of overrideComponents) {
      const description = component.description
        ? ` — ${component.description}`
        : "";
      sections.push(`- **${component.name}**${description}`);
    }
  }

  return sections.join("\n");
}

export function getComponentList(ds: DesignSystemWithComponents): string[] {
  return ds.components
    .filter((c) => c.destination?.startsWith("components/ui/") ?? false)
    .map((c) => c.name);
}
