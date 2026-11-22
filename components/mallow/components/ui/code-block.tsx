"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cardSlab, optionTrack } from "./_shared";
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

/**
 * Tone per capture group: plain, comment, string, keyword, call. Code stays
 * in the ink and muted text colours and is told apart by weight and tone,
 * since coral is kept for a fee.
 */
const TONES = [
  "",
  "italic text-muted-foreground/80",
  "text-foreground",
  "text-muted-foreground",
  "font-medium text-foreground",
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
 * Mallow CodeBlock: a white card with a caption row and a ghost copy button,
 * holding the code on a lilac option track inside the card, set in Geist Mono.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;
    const tokens = React.useMemo(() => highlight(code), [code]);

    return (
      <div data-slot="code-block" className={cn(cardSlab, "overflow-hidden rounded-3xl p-2")}>
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-11 items-center justify-between gap-3 ps-3 pe-1 pb-2"
          >
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">{caption}</span>
            {showCopy && <CopyButton value={code} size="icon-sm" label="Copy code" />}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            optionTrack,
            "m-0 overflow-x-auto rounded-2xl px-4 py-3.5 font-mono text-sm leading-relaxed text-foreground/80",
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
