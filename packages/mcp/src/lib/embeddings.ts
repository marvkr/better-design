import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: "gemini-embedding-001" });
  // outputDimensionality is supported at runtime but missing from older @google/generative-ai types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await model.embedContent({ content: { parts: [{ text }], role: "user" }, outputDimensionality: 768 } as any);
  return result.embedding.values;
}

export async function generateQueryEmbedding(text: string): Promise<number[]> {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: "gemini-embedding-001" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await model.embedContent({ content: { parts: [{ text }], role: "user" }, outputDimensionality: 768 } as any);
  return result.embedding.values;
}

export function createEmbeddingText(metadata: {
  title: string;
  description: string;
  personality: string[];
  industry: string[];
}): string {
  return [
    `Title: ${metadata.title}`,
    `Description: ${metadata.description}`,
    `Personality: ${metadata.personality.join(", ")}`,
    `Industry: ${metadata.industry.join(", ")}`,
  ].join("\n");
}
