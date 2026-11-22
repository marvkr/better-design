"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cardSlab, wellInset } from "./_shared";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

type Tone = "keyword" | "string" | "fn" | "comment" | "plain";

/**
 * Burnished has no syntax palette, so code is coloured with the warm light
 * alone: keywords in the copper link colour, strings in a dimmer glow,
 * calls in full cream, comments in muted italic.
 */
const TONE_CLASS = {
  keyword: "text-primary-text",
  string: "text-glow/75",
  fn: "font-medium text-foreground",
  comment: "italic text-muted-foreground",
  plain: "",
} as const satisfies { [tone in Tone]: string };

// One pass over the source: comments, strings, keywords, then calls.
const TOKEN =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|const|let|var|function|return|await|async|if|else|for|while|new|class|extends|interface|type|default|true|false|null|undefined|def|curl)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()/g;

/** The tone for one lexer match, by the capture group that matched. */
function toneOf(match: RegExpMatchArray): Tone {
  if (match[1]) return "comment";
  if (match[2]) return "string";
  if (match[3]) return "keyword";
  if (match[4]) return "fn";
  return "plain";
}

/** Splits source into toned spans with a small, language-agnostic lexer. */
function highlight(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(code.slice(last, start));
    parts.push(
      <span key={start} className={TONE_CLASS[toneOf(match)]}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

/**
 * Burnished CodeBlock: a recessed well cut into an umber slab.
 *
 * The slab carries a slim header with the file or language name and a ghost
 * copy button. The code sits below in a well, sunk into the slab and lit
 * along its bottom lip, set in Geist Mono.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;
    const tokens = React.useMemo(() => highlight(code), [code]);

    return (
      <div
        data-slot="code-block"
        className={cn(cardSlab, "overflow-hidden rounded-2xl p-1.5")}
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-10 items-center justify-between gap-3 ps-3 pe-0.5"
          >
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {caption}
            </span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
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
            wellInset,
            "overflow-x-auto rounded-xl px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed tracking-normal text-foreground/85",
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
