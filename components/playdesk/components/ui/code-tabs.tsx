"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

/*
 * Playdesk CodeTabs — a dark code window with a segmented strip along its top
 * edge, in the same pill language as Tabs.
 */

export interface CodeTabsItem {
  label: string;
  code: string;
  language?: string;
  filename?: string;
}

export interface CodeTabsProps {
  tabs: CodeTabsItem[];
  defaultTab?: string;
  className?: string;
}

const CodeTabs = ({ tabs, defaultTab, className }: CodeTabsProps) => {
  const [active, setActive] = React.useState(defaultTab ?? tabs[0]?.label);
  const current = tabs.find((tab) => tab.label === active) ?? tabs[0];

  if (!current) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-foreground/95 text-background",
        "[box-shadow:var(--shadow-float)]",
        className,
      )}
    >
      <div className="flex items-center gap-0.5 border-b border-background/10 px-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              "transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
              active === tab.label
                ? "bg-background/15 text-background"
                : "text-background/55 hover:text-background",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={current.code}
        language={current.language}
        filename={current.filename}
        className="rounded-none [box-shadow:none] [&>div]:border-0 [&>div]:pt-1"
      />
    </div>
  );
};
CodeTabs.displayName = "CodeTabs";

export { CodeTabs };
