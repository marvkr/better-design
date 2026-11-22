"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Control Room CodeBlock: terminal viewport. Recessed near-black well
// with a panel-header filename bar; line numbers read like log offsets
// and copy confirms in signal green.

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        "border border-border bg-input",
        "[box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
          <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
            {filename}
          </span>
          {language && (
            <span className="rounded-xs border border-primary/30 bg-primary/15 px-2 py-0.5 text-[0.625rem] uppercase tracking-wider text-primary">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 w-6 shrink-0 select-none text-right text-muted-foreground/40">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-2 top-2",
            "inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1",
            "border border-border bg-secondary",
            "text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground",
            "transition-colors duration-fast",
            "hover:border-ring/50 hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          )}
        >
          <Icon
            icon={copied ? "tabler:check" : "tabler:copy"}
            className={cn("size-3", copied && "text-primary")}
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
