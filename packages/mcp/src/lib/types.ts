// MCP-specific types. DB record types below mirror the shapes in
// @better-design/shared — keep them in sync if the schema changes.

export interface DesignSystemMetadata {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number;
  primaryColor?: string;
  borderRadius?: string;
  font?: string;
}

export interface DesignSystemComponent {
  name: string;
  description: string;
  useCases?: string[];
  language: string;
  destination: string;
  code: string;
}

export interface DesignSystem {
  metadata: DesignSystemMetadata;
  components: DesignSystemComponent[];
  rawContent: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number;
  matchScore: number;
}

export interface SearchResponse {
  results: SearchResult[];
  error?: string;
}

export interface DocsResponse {
  data: string;
  error?: string;
}

export type DocumentTopic =
  | "globals"
  | "colors"
  | "button"
  | "card"
  | "input"
  | "badge"
  | "progress"
  | "animation"
  | "principles"
  | "all";
