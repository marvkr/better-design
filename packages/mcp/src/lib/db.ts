import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import type {
  DesignSystem,
  DesignSystemMetadata,
  DesignSystemComponent,
  SearchResult,
} from "./types.js";

let sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    sql = neon(databaseUrl);
  }
  return sql;
}

export async function searchByEmbedding(
  queryVector: number[],
  limit: number = 5,
): Promise<SearchResult[]> {
  const db = getSql();
  const vectorStr = `[${queryVector.join(",")}]`;

  const results = await db`
    SELECT
      id,
      title,
      description,
      personality,
      industry,
      component_count,
      1 - (embedding <=> ${vectorStr}::vector) as similarity
    FROM design_systems
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::vector
    LIMIT ${limit}
  `;

  return results.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    personality: row.personality as string[],
    industry: row.industry as string[],
    componentCount: row.component_count as number,
    matchScore: (row.similarity as number) * 100,
  }));
}

export async function getDesignSystemById(
  id: string,
): Promise<DesignSystem | null> {
  const db = getSql();

  // Get design system metadata
  const systems = await db`
    SELECT
      id, title, description, personality, industry,
      component_count, primary_color, border_radius, font, raw_content
    FROM design_systems
    WHERE id = ${id}
  `;

  if (systems.length === 0) {
    return null;
  }

  const system = systems[0];

  // Get components
  const components = await db`
    SELECT name, description, use_cases, language, destination, code
    FROM components
    WHERE design_system_id = ${id}
  `;

  const metadata: DesignSystemMetadata = {
    id: system.id as string,
    title: system.title as string,
    description: system.description as string,
    personality: system.personality as string[],
    industry: system.industry as string[],
    componentCount: system.component_count as number,
    primaryColor: system.primary_color as string | undefined,
    borderRadius: system.border_radius as string | undefined,
    font: system.font as string | undefined,
  };

  const parsedComponents: DesignSystemComponent[] = components.map((c) => ({
    name: c.name as string,
    description: c.description as string,
    useCases: c.use_cases as string[] | undefined,
    language: c.language as string,
    destination: c.destination as string,
    code: c.code as string,
  }));

  return {
    metadata,
    components: parsedComponents,
    rawContent: system.raw_content as string,
  };
}

export async function getDesignSystemWithComponents(
  id: string,
  componentNames?: string[],
): Promise<DesignSystem | null> {
  const db = getSql();

  // Get design system metadata
  const systems = await db`
    SELECT
      id, title, description, personality, industry,
      component_count, primary_color, border_radius, font, raw_content
    FROM design_systems
    WHERE id = ${id}
  `;

  if (systems.length === 0) {
    return null;
  }

  const system = systems[0];

  // Get components - filter by name if specified
  const components = componentNames && componentNames.length > 0
    ? await db`
        SELECT name, description, use_cases, language, destination, code
        FROM components
        WHERE design_system_id = ${id} AND name = ANY(${componentNames})
      `
    : await db`
        SELECT name, description, use_cases, language, destination, code
        FROM components
        WHERE design_system_id = ${id}
      `;

  const metadata: DesignSystemMetadata = {
    id: system.id as string,
    title: system.title as string,
    description: system.description as string,
    personality: system.personality as string[],
    industry: system.industry as string[],
    componentCount: system.component_count as number,
    primaryColor: system.primary_color as string | undefined,
    borderRadius: system.border_radius as string | undefined,
    font: system.font as string | undefined,
  };

  const parsedComponents: DesignSystemComponent[] = components.map((c) => ({
    name: c.name as string,
    description: c.description as string,
    useCases: c.use_cases as string[] | undefined,
    language: c.language as string,
    destination: c.destination as string,
    code: c.code as string,
  }));

  return {
    metadata,
    components: parsedComponents,
    rawContent: system.raw_content as string,
  };
}

export async function upsertDesignSystem(
  designSystem: DesignSystem,
  embedding: number[],
): Promise<void> {
  const db = getSql();
  const { metadata, components, rawContent } = designSystem;
  const vectorStr = `[${embedding.join(",")}]`;

  // Upsert design system
  await db`
    INSERT INTO design_systems (
      id, title, description, personality, industry,
      component_count, primary_color, border_radius, font,
      raw_content, embedding, updated_at
    ) VALUES (
      ${metadata.id},
      ${metadata.title},
      ${metadata.description},
      ${metadata.personality},
      ${metadata.industry},
      ${metadata.componentCount},
      ${metadata.primaryColor || null},
      ${metadata.borderRadius || null},
      ${metadata.font || null},
      ${rawContent},
      ${vectorStr}::vector,
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      personality = EXCLUDED.personality,
      industry = EXCLUDED.industry,
      component_count = EXCLUDED.component_count,
      primary_color = EXCLUDED.primary_color,
      border_radius = EXCLUDED.border_radius,
      font = EXCLUDED.font,
      raw_content = EXCLUDED.raw_content,
      embedding = EXCLUDED.embedding,
      updated_at = NOW()
  `;

  // Delete existing components and insert new ones
  await db`DELETE FROM components WHERE design_system_id = ${metadata.id}`;

  for (const component of components) {
    await db`
      INSERT INTO components (
        design_system_id, name, description, use_cases, language, destination, code
      ) VALUES (
        ${metadata.id},
        ${component.name},
        ${component.description},
        ${component.useCases || null},
        ${component.language},
        ${component.destination},
        ${component.code}
      )
    `;
  }
}

export async function getFoundationalDocById(
  id: string,
): Promise<string | null> {
  const db = getSql();

  const docs = await db`
    SELECT content FROM foundational_docs WHERE id = ${id}
  `;

  if (docs.length === 0) {
    return null;
  }

  return docs[0].content as string;
}

export async function upsertFoundationalDoc(
  id: string,
  title: string,
  content: string,
  embedding: number[],
): Promise<void> {
  const db = getSql();
  const vectorStr = `[${embedding.join(",")}]`;

  await db`
    INSERT INTO foundational_docs (id, title, content, embedding, updated_at)
    VALUES (${id}, ${title}, ${content}, ${vectorStr}::vector, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding,
      updated_at = NOW()
  `;
}

export async function getAllDesignSystemIds(): Promise<string[]> {
  const db = getSql();

  const results = await db`SELECT id FROM design_systems`;
  return results.map((r) => r.id as string);
}

// Principle-specific queries

export interface PrincipleDoc {
  id: string;
  title: string;
  content: string;
}

export interface PrincipleSearchResult {
  id: string;
  title: string;
  content: string;
  matchScore: number;
}

export async function getPrincipleByTopic(
  topic: string,
): Promise<PrincipleDoc | null> {
  const db = getSql();
  const id = `principle-${topic}`;

  const docs = await db`
    SELECT id, title, content FROM foundational_docs WHERE id = ${id}
  `;

  if (docs.length === 0) {
    return null;
  }

  return {
    id: docs[0].id as string,
    title: docs[0].title as string,
    content: docs[0].content as string,
  };
}

export async function searchPrinciplesByEmbedding(
  queryVector: number[],
  limit: number = 3,
): Promise<PrincipleSearchResult[]> {
  const db = getSql();
  const vectorStr = `[${queryVector.join(",")}]`;

  const results = await db`
    SELECT
      id,
      title,
      content,
      1 - (embedding <=> ${vectorStr}::vector) as similarity
    FROM foundational_docs
    WHERE id LIKE 'principle-%'
      AND embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::vector
    LIMIT ${limit}
  `;

  return results.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    matchScore: (row.similarity as number) * 100,
  }));
}

export async function searchFoundationalDocsByEmbedding(
  queryVector: number[],
  limit: number = 5,
): Promise<PrincipleSearchResult[]> {
  const db = getSql();
  const vectorStr = `[${queryVector.join(",")}]`;

  // Fetch more candidates for intelligent ranking
  const candidateLimit = Math.min(limit * 3, 20);

  const results = await db`
    SELECT
      id,
      title,
      content,
      1 - (embedding <=> ${vectorStr}::vector) as similarity,
      LENGTH(content) as content_length,
      SPLIT_PART(id, '-', 1) as category
    FROM foundational_docs
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::vector
    LIMIT ${candidateLimit}
  `;

  // Multi-factor ranking: boost results based on quality signals
  const rankedResults = results
    .map((row) => {
      const hasCodeExamples = (row.content as string).includes("```");
      const id = row.id as string;
      const title = (row.title as string).toLowerCase();
      const isImplementation = id.includes("-implementation-") ||
                              id.includes("-patterns") ||
                              title.includes("implementation") ||
                              title.includes("patterns");
      const isChecklist = id.includes("-checklist") || title.includes("checklist");
      const contentLength = row.content_length as number;
      const similarity = row.similarity as number;

      // Base similarity score
      let adjustedScore = similarity;

      // Boost comprehensive docs (500+ words)
      if (contentLength > 500) {
        adjustedScore *= 1.15;
      }

      // Boost docs with code examples (implementation value)
      if (hasCodeExamples) {
        adjustedScore *= 1.2;
      }

      // Boost implementation/pattern docs (practical over theoretical)
      if (isImplementation) {
        adjustedScore *= 1.15;
      }

      // Boost checklists for actionable guidance
      if (isChecklist) {
        adjustedScore *= 1.1;
      }

      // Penalize very short docs (likely incomplete or too abstract)
      if (contentLength < 300) {
        adjustedScore *= 0.85;
      }

      return {
        id: row.id as string,
        title: row.title as string,
        content: row.content as string,
        matchScore: similarity * 100,
        adjustedScore,
      };
    })
    // Filter low-quality matches (below 30% similarity)
    .filter((result) => result.matchScore >= 30)
    // Sort by adjusted score
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    // Take top N results
    .slice(0, limit);

  return rankedResults.map(({ adjustedScore, ...result }) => result);
}

export async function getAllPrinciples(): Promise<PrincipleDoc[]> {
  const db = getSql();

  const results = await db`
    SELECT id, title, content
    FROM foundational_docs
    WHERE id LIKE 'principle-%'
    ORDER BY id
  `;

  return results.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
  }));
}

export async function getPrinciplesIndex(): Promise<
  { id: string; title: string }[]
> {
  const db = getSql();

  const results = await db`
    SELECT id, title
    FROM foundational_docs
    WHERE id LIKE 'principle-%'
    ORDER BY id
  `;

  return results.map((row) => ({
    id: row.id as string,
    title: row.title as string,
  }));
}

// Icon library queries

export interface IconLibrary {
  id: string;
  name: string;
  prefix: string;
  iconCount: number | null;
  license: string | null;
  category: string | null;
  tags: string[];
  description: string | null;
  variants: string[] | null;
  defaultVariant: string | null;
}

export interface IconLibrarySearchResult extends IconLibrary {
  matchScore: number;
}

export async function searchIconLibrariesByEmbedding(
  queryVector: number[],
  limit: number = 5,
): Promise<IconLibrarySearchResult[]> {
  const db = getSql();
  const vectorStr = `[${queryVector.join(",")}]`;

  const results = await db`
    SELECT
      id,
      name,
      prefix,
      icon_count,
      license,
      category,
      tags,
      description,
      variants,
      default_variant,
      1 - (embedding <=> ${vectorStr}::vector) as similarity
    FROM icon_libraries
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorStr}::vector
    LIMIT ${limit}
  `;

  return results.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    prefix: row.prefix as string,
    iconCount: row.icon_count as number | null,
    license: row.license as string | null,
    category: row.category as string | null,
    tags: row.tags as string[],
    description: row.description as string | null,
    variants: row.variants as string[] | null,
    defaultVariant: row.default_variant as string | null,
    matchScore: (row.similarity as number) * 100,
  }));
}

export async function getIconLibraryById(
  id: string,
): Promise<IconLibrary | null> {
  const db = getSql();

  const results = await db`
    SELECT
      id, name, prefix, icon_count, license, category,
      tags, description, variants, default_variant
    FROM icon_libraries
    WHERE id = ${id}
  `;

  if (results.length === 0) {
    return null;
  }

  const row = results[0];
  return {
    id: row.id as string,
    name: row.name as string,
    prefix: row.prefix as string,
    iconCount: row.icon_count as number | null,
    license: row.license as string | null,
    category: row.category as string | null,
    tags: row.tags as string[],
    description: row.description as string | null,
    variants: row.variants as string[] | null,
    defaultVariant: row.default_variant as string | null,
  };
}

export async function upsertIconLibrary(
  library: IconLibrary,
  embedding: number[],
): Promise<void> {
  const db = getSql();
  const vectorStr = `[${embedding.join(",")}]`;

  await db`
    INSERT INTO icon_libraries (
      id, name, prefix, icon_count, license, category,
      tags, description, variants, default_variant, embedding, updated_at
    ) VALUES (
      ${library.id},
      ${library.name},
      ${library.prefix},
      ${library.iconCount},
      ${library.license},
      ${library.category},
      ${library.tags},
      ${library.description},
      ${library.variants},
      ${library.defaultVariant},
      ${vectorStr}::vector,
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      prefix = EXCLUDED.prefix,
      icon_count = EXCLUDED.icon_count,
      license = EXCLUDED.license,
      category = EXCLUDED.category,
      tags = EXCLUDED.tags,
      description = EXCLUDED.description,
      variants = EXCLUDED.variants,
      default_variant = EXCLUDED.default_variant,
      embedding = EXCLUDED.embedding,
      updated_at = NOW()
  `;
}

export async function getAllIconLibraryIds(): Promise<string[]> {
  const db = getSql();

  const results = await db`SELECT id FROM icon_libraries`;
  return results.map((r) => r.id as string);
}
