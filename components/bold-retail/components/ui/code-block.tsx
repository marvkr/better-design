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
 * Bold retail CodeBlock: a square, flat panel of code.
 *
 * The panel uses the code surface behind a soft hairline, with square
 * corners like every container. A header row names the file or language on
 * the left and holds a circular copy button on the right, split from the
 * code by the same hairline.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-none border border-(--border-soft) bg-(--code) font-mono text-sm text-(--code-foreground)"
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex min-h-10 items-center justify-between gap-3 border-b border-(--border-soft) py-1 ps-4 pe-1"
          >
            <span className="min-w-0 truncate font-sans text-xs font-medium text-muted-foreground">
              {caption}
            </span>
            {showCopy && <CopyButton value={code} size="icon-sm" label="Copy code" />}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn("overflow-x-auto p-4 font-mono text-sm leading-relaxed", className)}
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
