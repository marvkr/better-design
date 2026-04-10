"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div
      className={cn(
        "group relative rounded-[10px] border border-border/40 bg-card overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header */}
      {language && (
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {language}
          </span>
          <CopyButton value={code} />
        </div>
      )}

      {/* Copy button (no header) */}
      {!language && (
        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <CopyButton value={code} />
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed text-foreground/90 font-mono">
          <code>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-muted-foreground/40 min-w-[2rem] text-xs">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock }
