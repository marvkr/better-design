"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

// Hyperline CodeBlock: deep recessed terminal surface with optional filename
// chrome and line numbers.

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = false,
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        "bg-[oklch(0.17_0.028_297)] border border-border/60",
        "shadow-[var(--hl-shadow-card)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
          <CopyButton value={code} />
        </div>
      )}
      <div className="relative">
        {!filename && (
          <div className="absolute right-2 top-2 z-10">
            <CopyButton value={code} />
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90">
          <code className="font-mono" data-lang={language}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="block">
                    <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                    {line}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
