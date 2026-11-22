"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Code Block: syntax-highlighted code display with copy button

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
        "relative rounded-xl overflow-hidden",
        "backdrop-blur-xl bg-foreground/[0.04] border border-border",
        "shadow-[inset_0_0_0.5rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-2.5 backdrop-blur-md bg-foreground/[0.03]">
          <span className="text-xs font-medium text-foreground/50">{filename}</span>
          {language && (
            <span className="text-xs text-foreground/30 rounded-full px-2 py-0.5 bg-foreground/[0.06]">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm text-foreground/80">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 w-6 shrink-0 select-none text-right text-foreground/20">
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
            "backdrop-blur-md bg-foreground/[0.08] border border-border",
            "text-xs text-foreground/50 transition-all duration-base",
            "hover:bg-foreground/[0.14] hover:text-foreground/80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
          )}
        >
          <Icon
            icon={copied ? "tabler:check" : "tabler:copy"}
            className={cn("h-3 w-3", copied && "text-emerald-400")}
          />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
