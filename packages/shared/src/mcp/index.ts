import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DataProvider } from "./data-provider";
import { INSTRUCTIONS } from "./instructions";
import { registerAllTools } from "./tools";

export interface CreateMcpServerOptions {
  provider: DataProvider;
  name?: string;
  version?: string;
  /** Optional hook called on every tool invocation for analytics */
  onToolUsage?: (tool: string, params: Record<string, unknown>) => void;
}

export function createMcpServer(options: CreateMcpServerOptions): McpServer {
  const {
    provider,
    name = "BetterDesign",
    version = "3.0.0",
    onToolUsage,
  } = options;

  const server = new McpServer(
    { name, version },
    { instructions: INSTRUCTIONS },
  );

  registerAllTools(server, provider, onToolUsage);

  return server;
}

// Re-exports
export type { DataProvider };
export type {
  DesignSystemSearchResult,
  DesignSystemMetadata,
  DesignSystemComponent,
  DesignSystemWithComponents,
  FoundationalDoc,
  FoundationalDocSearchResult,
  IconLibrarySearchResult,
  IconLibraryInfo,
} from "./data-provider";
export { INSTRUCTIONS } from "./instructions";
