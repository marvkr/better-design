"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass CodeBlock: recessed code well with header bar and copy control.

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, showLineNumbers, filename, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)
    const lines = code.split("\n")

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      } catch {
        // Clipboard unavailable; leave state unchanged.
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl",
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-well)]",
          "border border-[color:var(--ag-border)]",
          "shadow-[var(--shadow-glass)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--ag-border)] bg-[var(--ag-fill)] px-4 py-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {filename ?? language ?? "code"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-[var(--ag-fill-hover)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <Icon
              icon={copied ? "tabler:check" : "tabler:copy"}
              className={cn("h-3.5 w-3.5", copied && "text-primary")}
            />
          </button>
        </div>
        <pre className="m-0 overflow-x-auto p-4 text-xs leading-relaxed text-foreground/85">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="block">
                    <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                    {line}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
export type { CodeBlockProps }
