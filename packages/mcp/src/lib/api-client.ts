/**
 * Thin HTTP client for the Better Design API.
 * All data flows through the backend — the MCP never touches the DB directly.
 */

const API_URL = process.env.API_URL ?? "https://better-design.com";
const API_KEY = process.env.BETTER_DESIGN_API_KEY;

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  if (!API_KEY) {
    throw new ApiError(401, "BETTER_DESIGN_API_KEY is not set. Get one at https://better-design.com/settings");
  }

  const res = await fetch(`${API_URL}/api${path}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(res.status, (body as { message?: string }).message ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Design Systems ──────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
  componentCount: number;
  matchScore: number;
}

export async function searchDesignSystems(query: string, limit = 5) {
  return request<{ results: SearchResult[] }>(
    `/v1/design-systems/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

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

export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
}

export async function getDesignSystem(id: string) {
  return request<{ metadata: DesignSystemMetadata; componentCount: number }>(
    `/v1/design-systems/${encodeURIComponent(id)}`,
  );
}

export async function getDesignSystemComponents(id: string, names?: string[]) {
  const params = names?.length ? `?names=${names.map(encodeURIComponent).join(",")}` : "";
  return request<{ components: Component[] }>(
    `/v1/design-systems/${encodeURIComponent(id)}/components${params}`,
  );
}

// ─── Principles ──────────────────────────────────────────────────────────

export interface Principle {
  id: string;
  title: string;
  content: string;
}

export interface PrincipleSearchResult extends Principle {
  matchScore: number;
}

export async function listPrinciples() {
  return request<{ principles: { id: string; title: string }[] }>(`/v1/principles`);
}

export async function getPrinciple(topic: string) {
  return request<Principle>(`/v1/principles/${encodeURIComponent(topic)}`);
}

export async function searchPrinciples(query: string, limit = 5) {
  return request<{ results: PrincipleSearchResult[] }>(
    `/v1/principles/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

// ─── Icon Libraries ──────────────────────────────────────────────────────

export interface IconLibraryResult {
  id: string;
  name: string;
  prefix: string;
  category: string | null;
  tags: string[];
  matchScore: number;
  variants: string[] | null;
  defaultVariant: string | null;
}

export async function searchIconLibraries(query: string, limit = 5) {
  return request<{ results: IconLibraryResult[] }>(
    `/v1/icon-libraries/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

export async function searchIcons(libraryId: string, query: string, variant?: string, limit = 15) {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  if (variant) params.set("variant", variant);
  return request<{ icons: string[]; library: { id: string; name: string; prefix: string } }>(
    `/v1/icon-libraries/${encodeURIComponent(libraryId)}/icons?${params}`,
  );
}

// ─── Review Rules ────────────────────────────────────────────────────────

export interface ReviewRule {
  id: string;
  title: string;
  content: string;
}

export async function getReviewRules(category: string = "all") {
  const params = category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
  return request<{ rules: ReviewRule[] }>(`/v1/review-rules${params}`);
}

// ─── Alerts ──────────────────────────────────────────────────────────────

export function trackToolUsage(tool: string, params: Record<string, unknown>) {
  // Fire-and-forget — never block MCP responses
  fetch(`${API_URL}/api/internal/alert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "mcp-usage", tool, params }),
    signal: AbortSignal.timeout(5000),
  }).catch(() => {});
}
