"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark CodeBlock: a recessed code well (the darkest surface in the
// ladder), mono text, with a raised copy key floating in its corner.

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-[var(--gauge-well-border)] bg-input shadow-[var(--shadow-well)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-[var(--gauge-well-border)] px-4 py-2">
          <span className="font-mono text-xs font-medium text-muted-foreground">
            {filename}
          </span>
          {language && (
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 font-mono text-sm text-foreground">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 w-6 shrink-0 select-none text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground shadow-[var(--shadow-raised)] transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
