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
 * Firefly CodeBlock: code on warm paper.
 *
 * Code stays light, like the rest of Firefly: a warm surface behind a
 * hairline and a 1rem corner, with monospace text in the ink colour. A
 * header row names the file or the language on the left and holds a ghost
 * copy pill on the right, split from the code by the same hairline.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-xl border border-border bg-card font-mono text-sm text-foreground"
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-10 items-center justify-between gap-3 border-b border-border ps-4 pe-1"
          >
            <span className="min-w-0 truncate text-xs text-muted-foreground">
              {caption}
            </span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
                label="Copy code"
                className="text-muted-foreground hover:text-foreground"
              />
            )}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "overflow-x-auto p-4 font-mono text-sm leading-relaxed",
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
