"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/*
 * Playdesk CodeBlock — the one dark panel on the desk. Code is a different
 * kind of surface from a window, so it inverts rather than tinting.
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
        "overflow-hidden rounded-xl bg-foreground/95 text-background",
        "[box-shadow:var(--shadow-float)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-background/10 px-3.5 py-2">
        <span className="font-mono text-[0.6875rem] tracking-[0.02em] text-background/70">
          {filename ?? language ?? "code"}
        </span>
        <CopyButton
          value={code}
          className="ml-auto text-background/60 hover:bg-background/10 hover:text-background"
        />
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[0.8125rem] leading-relaxed">{code}</code>
      </pre>
    </div>
  ),
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
