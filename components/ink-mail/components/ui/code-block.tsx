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

/** The three window dots that open every Ink mail code window. */
function WindowDots() {
  return (
    <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
      <span className="size-2.5 rounded-full bg-(--dot-red)" />
      <span className="size-2.5 rounded-full bg-(--dot-yellow)" />
      <span className="size-2.5 rounded-full bg-(--dot-green)" />
    </span>
  );
}

/**
 * Ink mail CodeBlock: the code window, the signature of the system.
 *
 * A deep, slightly cool well behind a stronger hairline and a 0.75rem
 * corner. The title bar opens with three small window dots, names the file
 * or the language in muted mono type, and holds a ghost copy control at the
 * end. The code below sits in Geist Mono at 0.8125rem with relaxed leading.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const caption = filename ?? language;

    return (
      <div
        data-slot="code-block"
        className="overflow-hidden rounded-lg border border-(--line-strong) bg-(--code) text-(--code-foreground)"
      >
        <div
          data-slot="code-block-header"
          className="flex min-h-10 items-center gap-3 border-b border-border px-4 py-2.5 pe-2"
        >
          <WindowDots />
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
            {caption}
          </span>
          {showCopy && (
            <CopyButton
              value={code}
              size="icon-sm"
              label="Copy code"
              className="-my-1.5 text-muted-foreground hover:text-foreground"
            />
          )}
        </div>
        <pre
          ref={ref}
          data-slot="code-block-code"
          className={cn(
            "overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-(--code-foreground)",
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
