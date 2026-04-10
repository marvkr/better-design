import { Icon } from "@iconify/react";
import Link from "next/link";
import { DesignSystemPreviewCard } from "@/app/design-systems/preview-card";

interface DesignSystemInfo {
  id: string;
  name: string;
  description: string;
  theme: "light" | "dark";
  tokens: Record<string, string>;
}

export function FeatureSections({ systems }: { systems: DesignSystemInfo[] }) {
  // Pick 3 visually distinct systems for the preview
  const showcaseSlugs = ["linear", "stripe", "glassmorphic-dark"];
  const showcaseSystems = showcaseSlugs
    .map((slug) => systems.find((s) => s.id === slug))
    .filter(Boolean) as DesignSystemInfo[];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-24 space-y-32">
      {/* Feature 1: Components */}
      <section className="space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Icon icon="tabler:components" className="size-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">
              20+ Design Systems, Ready to Use
            </h2>
          </div>
          <p className="text-muted-foreground pl-[52px]">
            Each one comes with 30+ components styled to match. Pick a vibe and
            scaffold it into your project.
          </p>
          <div className="pl-[52px]">
            <Link
              href="/design-systems"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Browse all design systems
              <Icon icon="tabler:arrow-right" className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showcaseSystems.map((system) => (
            <div key={system.id} className="group">
              <DesignSystemPreviewCard system={system} />
            </div>
          ))}
        </div>
      </section>

      {/* Feature 2: MCP Server */}
      <section className="space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Icon icon="tabler:plug" className="size-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">
              MCP Server for Your AI Tools
            </h2>
          </div>
          <p className="text-muted-foreground pl-[52px]">
            Install the MCP server and your AI coding tool gets design tokens,
            components, and UX principles as context. It writes code that
            actually matches your design system.
          </p>
        </div>
        <div className="pl-[52px] rounded-lg border bg-card overflow-hidden">
          <div className="px-4 py-2 border-b bg-muted/30 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-muted-foreground/20" />
              <div className="size-2.5 rounded-full bg-muted-foreground/20" />
              <div className="size-2.5 rounded-full bg-muted-foreground/20" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              claude_desktop_config.json
            </span>
          </div>
          <pre className="p-4 text-sm font-mono text-muted-foreground overflow-x-auto">
            <code>{`{
  "mcpServers": {
    "better-design": {
      "command": "npx",
      "args": ["-y", "better-design-mcp"]
    }
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* Feature 3: UX Principles */}
      <section className="space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Icon icon="tabler:bulb" className="size-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">
              UX Principles Built In
            </h2>
          </div>
          <p className="text-muted-foreground pl-[52px]">
            Your AI tool loads spacing, hierarchy, color, typography, and
            accessibility principles before writing UI code. The output follows
            real design guidelines instead of guessing.
          </p>
        </div>
        <div className="pl-[52px] grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "tabler:layout-distribute-vertical", label: "Spacing & Layout" },
            { icon: "tabler:typography", label: "Typography" },
            { icon: "tabler:palette", label: "Color & Contrast" },
            { icon: "tabler:accessible", label: "Accessibility" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 rounded-lg border bg-card p-3"
            >
              <Icon icon={item.icon} className="size-4 text-primary shrink-0" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
