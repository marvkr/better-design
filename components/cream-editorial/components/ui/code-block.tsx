"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

/**
 * Cream editorial CodeBlock: the dark warm panel a reading room shows its
 * product in.
 *
 * Code sits on warm charcoal with a 1.5rem corner, in pale monospace. A
 * slightly lighter header row names the file or the language on the left
 * and holds a quiet copy button on the right.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-xl bg-(--code) text-(--code-foreground)"
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-10 items-center justify-between gap-3 bg-(--code-header) ps-4 pe-1.5 text-xs text-(--code-muted)"
          >
            <span className="min-w-0 truncate font-mono">{caption}</span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
                label="Copy code"
                className="text-(--code-muted) hover:bg-(--code-foreground)/10 hover:text-(--code-foreground)"
              />
            )}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed",
            className,
          )}
          {...props}
        >
          <code>{code}</code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
