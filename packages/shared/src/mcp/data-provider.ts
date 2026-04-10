// ─── Shared types ───────────────────────────────────────────────────────

export interface DesignSystemSearchResult {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number | null;
  matchScore: number;
}

export interface DesignSystemMetadata {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number | null;
  primaryColor?: string | null;
  borderRadius?: string | null;
  font?: string | null;
}

export interface DesignSystemComponent {
  id: number | string;
  name: string;
  description: string | null;
  code: string;
}

export interface DesignSystemWithComponents {
  metadata: DesignSystemMetadata;
  components: DesignSystemComponent[];
}

export interface FoundationalDoc {
  id: string;
  title: string;
  content: string;
}

export interface FoundationalDocSearchResult extends FoundationalDoc {
  matchScore: number;
}

export interface IconLibrarySearchResult {
  id: string;
  name: string;
  prefix: string;
  category: string | null;
  tags: string[];
  variants: string[] | null;
  defaultVariant: string | null;
  matchScore: number;
}

export interface IconLibraryInfo {
  id: string;
  name: string;
  prefix: string;
  variants: string[] | null;
  defaultVariant: string | null;
  variantFormat: string | null;
}

// ─── DataProvider interface ─────────────────────────────────────────────

export interface DataProvider {
  // Design Systems
  searchDesignSystems(query: string, limit?: number): Promise<DesignSystemSearchResult[]>;
  getDesignSystemById(id: string): Promise<DesignSystemWithComponents | null>;

  // Principles
  listPrinciples(): Promise<{ id: string; title: string }[]>;
  getPrincipleByTopic(topic: string): Promise<FoundationalDoc | null>;
  searchPrinciples(query: string, limit?: number): Promise<FoundationalDocSearchResult[]>;

  // Review Rules
  getReviewRules(category?: string): Promise<FoundationalDoc[]>;

  // Icon Libraries
  searchIconLibraries(query: string, limit?: number): Promise<IconLibrarySearchResult[]>;
  getIconLibraryById(id: string): Promise<IconLibraryInfo | null>;
  searchIconsInLibrary(query: string, library: IconLibraryInfo, variant?: string, limit?: number): Promise<string[]>;
}
