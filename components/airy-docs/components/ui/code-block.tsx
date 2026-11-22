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

type Tone = "keyword" | "string" | "fn" | "comment" | "plain";

const TONE_CLASS = {
  keyword: "text-(--syntax-keyword)",
  string: "text-(--syntax-string)",
  fn: "text-(--syntax-fn)",
  comment: "text-(--syntax-comment) italic",
  plain: "",
} as const satisfies Record<Tone, string>;

// One pass over the source: comments, strings, keywords, then calls.
const TOKEN =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|const|let|var|function|return|await|async|if|else|for|while|new|class|extends|interface|type|default|true|false|null|undefined|def|curl)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()/g;

/** Splits source into coloured spans with a small, language-agnostic lexer. */
function highlight(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(code.slice(last, start));
    const tone: Tone = match[1]
      ? "comment"
      : match[2]
        ? "string"
        : match[3]
          ? "keyword"
          : match[4]
            ? "fn"
            : "plain";
    parts.push(
      <span key={start} className={TONE_CLASS[tone]}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

/**
 * Airy docs CodeBlock: a white code panel set in a pale tray.
 *
 * The tray is the green-grey surface with a hairline and a 1rem corner. Its
 * header row names the file or the language and holds a quiet copy button.
 * The code sits on a white inner panel in Geist Mono, with keywords,
 * strings, calls and comments each in their own syntax colour.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;
    const hasHeader = Boolean(caption) || showCopy;
    const tokens = React.useMemo(() => highlight(code), [code]);

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-xl border border-border bg-secondary p-0.5 text-foreground"
      >
        {hasHeader && (
          <div
            data-slot="code-block-header"
            className="flex h-9 items-center justify-between gap-3 ps-3 pe-0.5"
          >
            <span className="min-w-0 truncate text-xs font-medium text-muted-foreground">
              {caption}
            </span>
            {showCopy && (
              <CopyButton
                value={code}
                size="icon-sm"
                label="Copy code"
                className="text-muted-foreground hover:bg-muted hover:text-foreground"
              />
            )}
          </div>
        )}
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "overflow-x-auto rounded-lg bg-(--code) p-4 font-mono text-[0.8125rem] leading-relaxed text-(--code-foreground)",
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
