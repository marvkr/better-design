"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

// Ops Sharp Copy Button: a crisp hairline icon chip. Copies text, flips to an
// emerald check on success (the DS success accent).

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  timeout?: number
}

function CopyButton({
  value,
  timeout = 2000,
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), timeout)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground",
        "[box-shadow:var(--shadow-xs)]",
        "transition-colors hover:bg-secondary hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
