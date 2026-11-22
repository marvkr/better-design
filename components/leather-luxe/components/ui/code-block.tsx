"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

// Leather Luxe Code Block: code rests in a recessed well below a card-toned
// header strip; the copy control is a raised chip.

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
        "relative overflow-hidden rounded-lg",
        "border border-border bg-well [box-shadow:var(--shadow-well)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
          <span className="text-xs font-medium text-muted-foreground">
            {filename}
          </span>
          {language && (
            <span className="rounded-full border border-highlight px-2 py-0.5 text-xs text-muted-foreground [background-image:var(--gradient-raised)]">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm text-foreground/85">
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
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
            "[background-image:var(--gradient-raised)] border border-highlight",
            "[box-shadow:var(--shadow-raised-sm)]",
            "text-xs text-muted-foreground transition-[filter,color] duration-base",
            "hover:brightness-125 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          )}
        >
          {copied ? (
            <Check className="h-3 w-3 text-mint" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
