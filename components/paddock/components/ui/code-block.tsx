"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cardSlab } from "./_shared";
import { CopyButton } from "./copy-button";

/** Props for a single code sample with an optional file or language caption and a copy button. */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|const|let|var|function|return|await|async|if|else|for|new|class|interface|type|default|def|curl|true|false|null|undefined)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()/g;

/** Tone per capture group: plain, comment, string, keyword, call. Teal stays for strings only. */
const TONES = [
  "",
  "text-muted-foreground",
  "text-(--primary-text)",
  "font-medium text-foreground",
  "text-info-text",
];

/** Tones comments, strings, keywords and calls in one pass. */
function highlight(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(code.slice(last, start));
    const group = [1, 2, 3, 4].find((g) => match[g] !== undefined) ?? 0;
    parts.push(
      <span key={start} className={TONES[group]}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

/**
 * Paddock CodeBlock: a white bordered card with a quiet caption row and a ghost
 * copy button, holding the code in a flat grey well set in IBM Plex Mono.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;
    const tokens = React.useMemo(() => highlight(code), [code]);

    return (
      <div data-slot="code-block" className={cn(cardSlab, "overflow-hidden rounded-xl p-2")}>
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-9 items-center justify-between gap-3 ps-2 pb-2"
          >
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">{caption}</span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
                variant="ghost"
                label="Copy code"
                className="text-muted-foreground"
              />
            )}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "m-0 overflow-x-auto rounded-lg bg-muted px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-foreground",
            className,
          )}
          {...props}
        >
          <code>{tokens}</code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
