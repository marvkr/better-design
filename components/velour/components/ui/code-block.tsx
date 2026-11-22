"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

/*
 * A recessed velvet well for code, like the reference's command strip:
 * darker-than-canvas fill, inset shadow, hairline header.
 */

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
        "relative overflow-hidden rounded-lg border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5 [background-image:var(--velour)]">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
          {language && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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
          className={cn(
            "absolute right-2 top-2",
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1",
            "[background-image:var(--velour-raised)] [box-shadow:var(--shadow-button)]",
            "text-xs text-muted-foreground transition-[background-image,box-shadow,color] duration-fast",
            "hover:[background-image:var(--velour-hover)] hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          )}
        >
          <Icon
            icon={copied ? "tabler:check" : "tabler:copy"}
            className={cn("h-3 w-3", copied && "text-primary")}
          />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
