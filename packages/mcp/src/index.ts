#!/usr/bin/env node

import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "@better-design/shared/mcp";
import { createHttpDataProvider } from "./lib/http-data-provider.js";
import { trackToolUsage } from "./lib/api-client.js";

const server = createMcpServer({
  provider: createHttpDataProvider(),
  name: "DesignSystems",
  version: "3.0.0",
  onToolUsage: trackToolUsage,
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Better Design MCP Server v3.0 running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
