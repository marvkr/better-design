"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/*
 * Interior CodeBlock — code sits in a well: an 11px-radius slot cut into the
 * panel, tinted and inset-shadowed, never a dark inverted panel. The filename
 * strip is metadata, so it runs mono at 10.5px.
 */

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, filename, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[0.6875rem] bg-secondary text-foreground",
        "shadow-[var(--shadow-well)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2">
        <span className="font-mono text-[0.6563rem] tabular-nums text-muted-foreground">
          {filename ?? language ?? "code"}
        </span>
        <CopyButton
          value={code}
          className="ml-auto text-muted-foreground hover:bg-card hover:text-foreground"
        />
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[0.7813rem] leading-relaxed">{code}</code>
      </pre>
    </div>
  ),
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
