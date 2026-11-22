"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

// Retro-Playful Copy Button: icon button that copies text to clipboard

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
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-border bg-background text-muted-foreground shadow-[var(--shadow-hard-sm)]",
        "transition-colors hover:bg-secondary hover:text-foreground",
        "active:translate-x-[0.1875rem] active:translate-y-[0.1875rem] active:shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-foreground" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
