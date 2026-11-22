"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Neon Vault CodeBlock: a recessed code well sunk into the vault surface with
// a hairline rim and a quiet copy chip.

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
        "relative overflow-hidden rounded-xl border border-border bg-input [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
          {language && (
            <span className="text-xs text-muted-foreground">{language}</span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm text-foreground">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 w-6 shrink-0 select-none text-right text-muted-foreground/50">
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
          className="absolute right-2 top-2 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground [box-shadow:var(--shadow-raised)] transition-colors hover:text-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
