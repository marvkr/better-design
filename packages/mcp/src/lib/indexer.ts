import type { DesignSystem, SearchResult } from "./types.js";
import { generateQueryEmbedding } from "./embeddings.js";
import {
  searchByEmbedding,
  getDesignSystemById,
  getDesignSystemWithComponents as dbGetDesignSystemWithComponents,
  getFoundationalDocById,
  getAllDesignSystemIds as dbGetAllDesignSystemIds,
  getPrincipleByTopic,
  searchPrinciplesByEmbedding,
  searchFoundationalDocsByEmbedding,
  getPrinciplesIndex as dbGetPrinciplesIndex,
  searchIconLibrariesByEmbedding,
  getIconLibraryById as dbGetIconLibraryById,
  getAllIconLibraryIds as dbGetAllIconLibraryIds,
  type PrincipleDoc,
  type PrincipleSearchResult,
  type IconLibrary,
  type IconLibrarySearchResult,
} from "./db.js";

export async function searchDesignSystems(
  query: string,
): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await generateQueryEmbedding(query);

  // Search by vector similarity
  const results = await searchByEmbedding(queryEmbedding, 10);

  return results;
}

export async function getDesignSystem(
  id: string,
): Promise<DesignSystem | null> {
  return getDesignSystemById(id);
}

export async function getDesignSystemWithComponents(
  id: string,
  componentNames?: string[],
): Promise<DesignSystem | null> {
  return dbGetDesignSystemWithComponents(id, componentNames);
}

export async function getFoundationalDoc(
  topic: string,
): Promise<string | null> {
  return getFoundationalDocById(topic);
}

export async function getAllDesignSystemIds(): Promise<string[]> {
  return dbGetAllDesignSystemIds();
}

// Principle functions

export async function getPrinciple(
  topic: string,
): Promise<PrincipleDoc | null> {
  return getPrincipleByTopic(topic);
}

export async function searchPrinciples(
  query: string,
): Promise<PrincipleSearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  return searchPrinciplesByEmbedding(queryEmbedding, 3);
}

export async function searchFoundationalDocs(
  query: string,
  limit: number = 5,
): Promise<PrincipleSearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  return searchFoundationalDocsByEmbedding(queryEmbedding, limit);
}

export async function getPrinciplesIndex(): Promise<
  { id: string; title: string }[]
> {
  return dbGetPrinciplesIndex();
}

// Icon library functions

export async function searchIconLibraries(
  query: string,
  limit: number = 5,
): Promise<IconLibrarySearchResult[]> {
  const queryEmbedding = await generateQueryEmbedding(query);
  return searchIconLibrariesByEmbedding(queryEmbedding, limit);
}

export async function getIconLibrary(
  id: string,
): Promise<IconLibrary | null> {
  return dbGetIconLibraryById(id);
}

export async function getAllIconLibraryIds(): Promise<string[]> {
  return dbGetAllIconLibraryIds();
}

export type { IconLibrary, IconLibrarySearchResult };

// Review rules functions

export async function getReviewRules(): Promise<PrincipleSearchResult[]> {
  // Get all review-* documents from foundational_docs
  const queryEmbedding = await generateQueryEmbedding("accessibility visual design review rules");
  return searchFoundationalDocsByEmbedding(queryEmbedding, 20);
}
