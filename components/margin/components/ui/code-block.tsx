"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { sheetSurface, codeToneClass, tokenizeCodeLines } from "./_shared";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

/**
 * Margin CodeBlock: code laid on a white sheet the way a notes editor shows
 * it. A slim bar above the sheet names the file or language in a paper tab
 * and holds the copy button at its end. The sheet has a hairline edge, a
 * right-aligned gutter of faint line numbers and the editor's own syntax
 * palette: violet keywords, magenta calls, green strings, orange numbers.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;
    const lines = React.useMemo(() => tokenizeCodeLines(code), [code]);

    return (
      <div data-slot="code-block" className="flex flex-col gap-2">
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex items-center justify-between gap-2"
          >
            {caption ? (
              <span className="inline-flex h-7 min-w-0 items-center truncate rounded-lg bg-card px-2.5 text-sm text-foreground shadow-(--pill-edge)">
                {caption}
              </span>
            ) : (
              <span />
            )}
            {showCopy && <CopyButton value={code} size="icon-sm" label="Copy code" />}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            sheetSurface,
            "m-0 overflow-x-auto rounded-xl pt-4 pb-5 pe-5 font-mono text-[0.8125rem] leading-6",
            className,
          )}
          {...props}
        >
          <code className="block">
            {lines.map((line, i) => (
              <span key={i} className="block whitespace-pre text-foreground">
                <span
                  aria-hidden
                  className="me-4 inline-block w-9.5 select-none text-right tabular-nums text-(--clause-gutter)"
                >
                  {i + 1}
                </span>
                {line.map((token, j) => (
                  <span key={j} className={codeToneClass[token.tone]}>
                    {token.text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
