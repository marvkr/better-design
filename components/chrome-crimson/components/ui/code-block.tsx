"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
  filename?: string
  showCopy?: boolean
  /** Drop the card chrome (border/radius/bg/shadow) when embedded, e.g. in CodeTabs. */
  bare?: boolean
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, bare = false, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Silent fail — copy is best-effort
      }
    }

    return (
      <div
        className={cn(
          "relative group overflow-hidden",
          bare
            ? "bg-transparent"
            : "rounded-lg bg-card border border-border [box-shadow:var(--shadow-sm)]"
        )}
      >
        {(filename || language) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {filename && <span className="font-mono">{filename}</span>}
              {language && !filename && (
                <span className="font-mono uppercase tracking-wider">{language}</span>
              )}
            </div>
          </div>
        )}
        <div className="relative">
          <pre
            ref={ref}
            className={cn(
              "overflow-x-auto p-4 text-xs leading-relaxed font-mono text-foreground",
              className
            )}
            {...props}
          >
            <code>{code}</code>
          </pre>
          {showCopy && (
            <button
              type="button"
              onClick={copy}
              className={cn(
                "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md",
                "bg-popover text-muted-foreground border border-border",
                "transition-[opacity,background-color,color,box-shadow] duration-fast",
                "opacity-0 group-hover:opacity-100",
                "[box-shadow:var(--shadow-sm)]",
                "hover:text-foreground hover:bg-accent hover:[box-shadow:var(--shadow-md)]",
                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40"
              )}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
