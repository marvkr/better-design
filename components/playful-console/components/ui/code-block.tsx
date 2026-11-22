"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/** Props for CodeBlock: the code text, plus an optional file name or language caption. */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

/**
 * Playful console CodeBlock: code on a light paper panel.
 *
 * A white panel with the olive hairline and the card corner. A cream header
 * strip names the file or language in bold and holds a small copy button on
 * the right, split from the code by the same hairline. Code sits in Source
 * Code Pro at a compact size with relaxed leading.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-lg border border-border bg-(--code) text-(--code-foreground)"
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-9 items-center justify-between gap-3 border-b border-border bg-secondary ps-3 pe-1"
          >
            <span className="min-w-0 truncate font-mono text-xs font-semibold text-(--foreground-secondary)">
              {caption}
            </span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
                label="Copy code"
                className="size-7 rounded-md text-muted-foreground hover:bg-(--surface-3) hover:text-foreground"
              />
            )}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed",
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
