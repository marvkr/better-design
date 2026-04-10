"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

// Luxe CodeBlock: dark code display — monospace, subtle border, header with language label
// Card bg distinguishes from page bg; copy button top-right corner

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-card",
        className
      )}
      {...props}
    >
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs text-muted-foreground font-mono">
                {filename}
              </span>
            )}
            {language && (
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/60 bg-secondary px-2 py-0.5 rounded-md border border-border">
                {language}
              </span>
            )}
          </div>
          <CopyButton value={code} />
        </div>
      )}
      {/* No header: floating copy button */}
      {!filename && !language && (
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CopyButton value={code} />
        </div>
      )}
      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">
          {showLineNumbers
            ? lines.map((line, i) => (
                <span key={i} className="flex gap-4">
                  <span className="select-none w-6 shrink-0 text-right text-muted-foreground/40 text-xs leading-relaxed">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  )
}

export { CodeBlock }
