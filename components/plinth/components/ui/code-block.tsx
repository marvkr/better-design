"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Plinth Code Block: a recessed well inside the panel, set in Geist Mono.
 * The file name and language sit in a header strip as editor readouts; the
 * copy key is the graphite toolbar key.
 */

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

function CodeBlock({ code, language, showLineNumbers = false, filename, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl bg-input [box-shadow:var(--shadow-inset)]", className)}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
          <span className="truncate font-mono text-[0.6875rem] uppercase text-secondary-foreground">{filename}</span>
          {language && <span className="font-mono text-[0.6875rem] uppercase text-muted-foreground">{language}</span>}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 pr-20 font-mono text-[0.8125rem] leading-relaxed text-foreground">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 w-6 shrink-0 select-none text-right tabular-nums text-muted-foreground/60">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute right-2 top-2 inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-secondary-foreground",
            "[background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)]",
            "transition-[box-shadow,color] duration-fast hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  )
}

// feather:copy
function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="13" height="13" x="9" y="9" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></g>
    </svg>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
