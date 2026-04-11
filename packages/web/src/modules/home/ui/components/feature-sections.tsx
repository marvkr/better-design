"use client";

import { Icon } from "@iconify/react";
import { CodeTabs } from "@/components/ui/code-tabs";
import { InteractiveFileTree } from "./interactive-file-tree";

const mcpIcon = (name: string) => <Icon icon={name} className="size-3.5" />;

const MCP_TABS = [
  {
    label: "Claude Code",
    lang: "bash",
    icon: mcpIcon("simple-icons:claude"),
    code: `claude mcp add better-design -- npx -y better-design-mcp`,
  },
  {
    label: "Cursor",
    lang: "json",
    icon: mcpIcon("simple-icons:cursor"),
    code: `// .cursor/mcp.json
{
  "mcpServers": {
    "better-design": {
      "command": "npx",
      "args": ["-y", "better-design-mcp"]
    }
  }
}`,
  },
  {
    label: "Windsurf",
    lang: "json",
    icon: mcpIcon("simple-icons:windsurf"),
    code: `// ~/.codeium/windsurf/mcp_config.json
{
  "mcpServers": {
    "better-design": {
      "command": "npx",
      "args": ["-y", "better-design-mcp"]
    }
  }
}`,
  },
  {
    label: "VS Code",
    lang: "json",
    icon: mcpIcon("simple-icons:visualstudiocode"),
    code: `// .vscode/mcp.json
{
  "servers": {
    "better-design": {
      "command": "npx",
      "args": ["-y", "better-design-mcp"]
    }
  }
}`,
  },
  {
    label: "Claude Desktop",
    lang: "json",
    icon: mcpIcon("simple-icons:claude"),
    code: `// claude_desktop_config.json
{
  "mcpServers": {
    "better-design": {
      "command": "npx",
      "args": ["-y", "better-design-mcp"]
    }
  }
}`,
  },
];

function BentoHeader({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-5 space-y-2">
      <div className="flex items-center gap-3">
        <Icon icon={icon} className="size-6 text-primary shrink-0" />
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function FeatureSections() {
  return (
    <section className="max-w-5xl mx-auto w-full px-4 pt-4 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* MCP setup — full width top */}
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden md:col-span-2">
          <BentoHeader
            icon="tabler:plug"
            title="MCP server for your AI tools"
            description="One command to install. Your AI gets design context while it codes."
          />
          <div className="px-5 pb-5">
            <CodeTabs tabs={MCP_TABS} />
          </div>
        </div>

        {/* File tree — left */}
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
          <BentoHeader
            icon="tabler:folder-code"
            title="A complete design system"
            description="Stop building UI from scratch. 87 components, design tokens, and styles ready to scaffold into your codebase."
          />
          <InteractiveFileTree />
        </div>

        {/* UX Principles — right */}
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden flex flex-col">
          <BentoHeader
            icon="tabler:bulb"
            title="UX principles built in"
            description="Your AI loads the right design guidelines before writing any UI code."
          />
          <div className="px-5 pb-5 space-y-4 flex-1 flex flex-col">
            {/* Flow diagram */}
            <div className="flex flex-col items-center gap-0">
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 w-full">
                <Icon icon="tabler:code" className="size-4 text-foreground/70 shrink-0" />
                <span className="text-xs">You edit <span className="font-mono text-primary">button.tsx</span></span>
              </div>
              <Icon icon="tabler:arrow-down" className="size-4 text-muted-foreground/40 my-1" />
              <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <Icon icon="tabler:brain" className="size-4 text-primary shrink-0" />
                  <span className="text-xs font-medium">AI loads relevant principles</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                    <Icon icon="tabler:click" className="size-3" />
                    Interactions
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                    <Icon icon="tabler:layers-intersect" className="size-3" />
                    Depth & Surfaces
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                    <Icon icon="tabler:bounce-right" className="size-3" />
                    Animation
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                    <Icon icon="tabler:palette" className="size-3" />
                    Color
                  </span>
                </div>
              </div>
              <Icon icon="tabler:arrow-down" className="size-4 text-muted-foreground/40 my-1" />
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 w-full">
                <Icon icon="tabler:check" className="size-4 text-green-500 shrink-0" />
                <span className="text-xs">Output follows real design guidelines</span>
              </div>
            </div>

            {/* Other available principles */}
            <div className="space-y-2 mt-auto pt-2">
              <p className="text-base font-medium text-muted-foreground">And many more principles</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: "tabler:layout-distribute-vertical", label: "Spacing & Layout" },
                  { icon: "tabler:typography", label: "Typography" },
                  { icon: "tabler:hierarchy-2", label: "Visual Hierarchy" },
                  { icon: "tabler:forms", label: "Forms" },
                  { icon: "tabler:photo", label: "Images" },
                  { icon: "tabler:sparkles", label: "Polish" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    <Icon icon={item.icon} className="size-3" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
