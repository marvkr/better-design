"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MCP_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/mcp`
  : "https://better-design.com/api/mcp";

type Client = {
  id: string;
  name: string;
  icon: string;
  config: (key: string) => string;
  language?: string;
};

const CLIENTS: Client[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    icon: "tabler:terminal-2",
    config: (key) =>
      `claude mcp add --scope global better-design --transport http ${MCP_URL} --header "Authorization: Bearer ${key}"`,
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "simple-icons:cursor",
    language: "json",
    config: (key) =>
      JSON.stringify(
        {
          mcpServers: {
            "better-design": {
              url: MCP_URL,
              headers: { Authorization: `Bearer ${key}` },
            },
          },
        },
        null,
        2,
      ),
  },
  {
    id: "vscode",
    name: "VS Code / Copilot",
    icon: "simple-icons:visualstudiocode",
    language: "json",
    config: (key) =>
      JSON.stringify(
        {
          servers: {
            "better-design": {
              type: "http",
              url: MCP_URL,
              headers: { Authorization: `Bearer ${key}` },
            },
          },
        },
        null,
        2,
      ),
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    icon: "simple-icons:claude",
    language: "json",
    config: (key) =>
      JSON.stringify(
        {
          mcpServers: {
            "better-design": {
              url: MCP_URL,
              headers: { Authorization: `Bearer ${key}` },
            },
          },
        },
        null,
        2,
      ),
  },
  {
    id: "windsurf",
    name: "Windsurf",
    icon: "simple-icons:windsurf",
    language: "json",
    config: (key) =>
      JSON.stringify(
        {
          mcpServers: {
            "better-design": {
              serverUrl: MCP_URL,
              headers: { Authorization: `Bearer ${key}` },
            },
          },
        },
        null,
        2,
      ),
  },
  {
    id: "legacy",
    name: "Legacy / Any tool",
    icon: "tabler:plug",
    language: "json",
    config: (key) =>
      JSON.stringify(
        {
          mcpServers: {
            "better-design": {
              command: "npx",
              args: [
                "@anthropics/mcp-remote",
                MCP_URL,
                "--header",
                `Authorization: Bearer ${key}`,
              ],
            },
          },
        },
        null,
        2,
      ),
  },
];

export function McpSetupPanel() {
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0].id);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const client = CLIENTS.find((c) => c.id === selectedClient) ?? CLIENTS[0];
  const configText = client.config(apiKey || "<YOUR_API_KEY>");

  async function handleCopy() {
    await navigator.clipboard.writeText(configText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MCP Setup</CardTitle>
        <CardDescription>
          Connect Better Design to your AI coding tool via the Model Context Protocol.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client selector */}
        <div className="flex flex-wrap gap-2">
          {CLIENTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClient(c.id)}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedClient === c.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <Icon icon={c.icon} className="h-3.5 w-3.5" />
              {c.name}
            </button>
          ))}
        </div>

        {/* API key input */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Paste your API key to fill in the config</label>
          <div className="relative">
            <Icon
              icon="tabler:key"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
            />
            <input
              type="password"
              placeholder="bd_live_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-md border border-border bg-background pl-8 pr-3 py-2 text-xs font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Config block */}
        <div className="relative rounded-md border border-border bg-muted/40 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
            <span className="text-xs text-muted-foreground font-mono">
              {selectedClient === "claude-code" ? "terminal" : client.language ?? "text"}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label={copied ? "Copied" : "Copy config"}
            >
              <Icon icon={copied ? "tabler:check" : "tabler:copy"} className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-foreground">
            <code>{configText}</code>
          </pre>
        </div>

        {/* File path hint */}
        {selectedClient === "claude-code" && (
          <p className="text-xs text-muted-foreground">
            Run this in your terminal. The <code className="bg-muted px-1 py-0.5 rounded">--scope global</code> flag makes it available in every project.
          </p>
        )}
        {selectedClient === "cursor" && (
          <p className="text-xs text-muted-foreground">
            Save this to <code className="bg-muted px-1 py-0.5 rounded">.cursor/mcp.json</code> in your project root.
          </p>
        )}
        {selectedClient === "vscode" && (
          <p className="text-xs text-muted-foreground">
            Save this to <code className="bg-muted px-1 py-0.5 rounded">.vscode/mcp.json</code> in your project root.
          </p>
        )}
        {selectedClient === "claude-desktop" && (
          <p className="text-xs text-muted-foreground">
            Add to your <code className="bg-muted px-1 py-0.5 rounded">claude_desktop_config.json</code>.
          </p>
        )}
        {selectedClient === "windsurf" && (
          <p className="text-xs text-muted-foreground">
            Save to <code className="bg-muted px-1 py-0.5 rounded">~/.codeium/windsurf/mcp_config.json</code>.
          </p>
        )}
        {selectedClient === "legacy" && (
          <p className="text-xs text-muted-foreground">
            Requires <code className="bg-muted px-1 py-0.5 rounded">npx</code>. Works with any tool that supports stdio MCP servers.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
