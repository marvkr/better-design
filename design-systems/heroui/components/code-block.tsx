"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

// Dynamic Code Block: dark card bg, monospace, copy button

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
}

function CodeBlock({ code, language, filename, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card",
        className
      )}
      {...props}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs text-muted-foreground font-mono">
            {filename ?? language}
          </span>
          <button
            onClick={handleCopy}
            className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-foreground">
          <code>{code}</code>
        </pre>
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
