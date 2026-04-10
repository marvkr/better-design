import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://better-design.com";

  const discovery = {
    mcpServers: {
      "better-design": {
        url: `${appUrl}/api/mcp`,
        transport: "streamable-http",
        auth: { type: "bearer" },
        tools: [
          "resolve-design-system",
          "get-design-system-docs",
          "get-ui-principle",
          "resolve-icon-library",
          "search-icons",
          "get-review-rules",
        ],
      },
    },
  };

  return NextResponse.json(discovery, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
