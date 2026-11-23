"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

// Copy Button: icon button that copies text to clipboard

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  timeout?: number
}

function CopyButton({
  value,
  timeout = 2000,
  className,
  onClick,
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
      onClick={(e) => { onClick?.(e); handleCopy(); }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md bg-background text-muted-foreground [box-shadow:var(--shadow-control)]",
        "transition-[background-color,color,box-shadow] hover:bg-secondary hover:text-foreground hover:[box-shadow:var(--shadow-control-hover)]",
        "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]",
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
