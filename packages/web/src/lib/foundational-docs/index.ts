import { sql, isNotNull } from "drizzle-orm";
import { db, foundationalDocs } from "@/db";
import { generateQueryEmbedding } from "../design-systems/embeddings";

export interface FoundationalDoc {
  id: string;
  title: string;
  content: string;
}

export interface FoundationalDocSearchResult extends FoundationalDoc {
  matchScore: number;
  category: string;
  hasCodeExamples: boolean;
  contentLength: number;
}

export async function listFoundationalDocs(): Promise<{ id: string; title: string }[]> {
  const docs = await db.query.foundationalDocs.findMany({
    columns: {
      id: true,
      title: true,
    },
  });

  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
  }));
}

export async function getFoundationalDocById(
  id: string,
): Promise<FoundationalDoc | null> {
  const doc = await db.query.foundationalDocs.findFirst({
    where: (docs, { eq }) => eq(docs.id, id),
  });

  if (!doc) {
    return null;
  }

  return {
    id: doc.id,
    title: doc.title,
    content: doc.content,
  };
}

export async function searchFoundationalDocs(
  query: string,
  limit: number = 2,
): Promise<FoundationalDocSearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  // Fetch more results than needed for intelligent ranking
  const candidateLimit = Math.min(limit * 3, 20);

  const results = await db
    .select({
      id: foundationalDocs.id,
      title: foundationalDocs.title,
      content: foundationalDocs.content,
      similarity: sql<number>`1 - (embedding <=> ${vectorStr}::vector)`,
      contentLength: sql<number>`LENGTH(${foundationalDocs.content})`,
      category: sql<string>`SPLIT_PART(${foundationalDocs.id}, '-', 1)`,
    })
    .from(foundationalDocs)
    .where(isNotNull(foundationalDocs.embedding))
    .orderBy(sql`embedding <=> ${vectorStr}::vector`)
    .limit(candidateLimit);

  // Multi-factor ranking: boost results based on quality signals
  const rankedResults = results
    .map((row) => {
      const hasCodeExamples = row.content.includes("```");
      const isImplementation = row.id.includes("-implementation-") ||
                              row.id.includes("-patterns") ||
                              row.title.toLowerCase().includes("implementation") ||
                              row.title.toLowerCase().includes("patterns");
      const isChecklist = row.id.includes("-checklist") ||
                         row.title.toLowerCase().includes("checklist");

      // Base similarity score
      let adjustedScore = row.similarity;

      // Boost comprehensive docs (500+ words)
      if (row.contentLength > 500) {
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
      if (row.contentLength < 300) {
        adjustedScore *= 0.85;
      }

      return {
        id: row.id,
        title: row.title,
        content: row.content,
        matchScore: Math.round(row.similarity * 100),
        category: row.category,
        hasCodeExamples,
        contentLength: row.contentLength,
        adjustedScore,
      };
    })
    // Filter low-quality matches (below 30% similarity)
    .filter((result) => result.matchScore >= 30)
    // Sort by adjusted score
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    // Take top N results
    .slice(0, limit);

  return rankedResults.map(({ adjustedScore: _, ...result }) => result);
}

export function formatFoundationalDocForPrompt(doc: FoundationalDoc): string {
  return `# ${doc.title}\n\n${doc.content}`;
}

export async function getReviewRules(): Promise<FoundationalDoc[]> {
  const docs = await db.query.foundationalDocs.findMany({
    where: (d, { like }) => like(d.id, "review-%"),
  });
  return docs.map((d) => ({ id: d.id, title: d.title, content: d.content }));
}

export async function getPrincipleByTopic(topic: string): Promise<FoundationalDoc | null> {
  return getFoundationalDocById(`principle-${topic}`);
}
