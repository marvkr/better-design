"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  onCopied?: () => void
}

function CopyButton({ value, onCopied, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    onCopied?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-muted-foreground",
        "transition-all duration-150 hover:bg-secondary/80 hover:text-foreground active:scale-[0.97]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={copied ? "Copied" : "Copy"}
      {...props}
    >
      {copied
        ? <Check className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
        : <Copy className="h-3.5 w-3.5" />
      }
    </button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
