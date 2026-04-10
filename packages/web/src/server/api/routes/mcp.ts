import { Hono } from "hono";
import { cors } from "hono/cors";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@better-design/shared/mcp";
import { createDbDataProvider } from "@/lib/mcp-data-provider";
import { requireApiKey, rateLimit } from "./v1/middleware";
import type { ApiKeyVariables } from "./v1/middleware";

const provider = createDbDataProvider();

async function handleMcpRequest(request: Request): Promise<Response> {
  const server = createMcpServer({ provider });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  try {
    await server.connect(transport);
    return await transport.handleRequest(request);
  } finally {
    await transport.close();
    await server.close();
  }
}

export const mcpRoute = new Hono<{ Variables: ApiKeyVariables }>()
  .use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "mcp-session-id"],
      exposeHeaders: ["mcp-session-id"],
    }),
  )
  .use("*", requireApiKey)
  .use("*", rateLimit("mcp", 60, 60_000))
  .get("/", (c) => handleMcpRequest(c.req.raw))
  .post("/", (c) => handleMcpRequest(c.req.raw))
  .delete("/", (c) => handleMcpRequest(c.req.raw));
