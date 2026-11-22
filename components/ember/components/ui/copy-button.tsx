"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass CopyButton: glass chip; the check flashes amber on success.

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  timeout?: number
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, timeout = 1800, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch {
        // Clipboard unavailable; leave state unchanged.
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)] text-muted-foreground",
          "border border-[color:var(--ag-border)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
          "transition-all duration-fast ease-out",
          "hover:bg-[var(--ag-fill-hover)] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          copied && "text-primary",
          className
        )}
        {...props}
      >
        <Icon icon={copied ? "tabler:check" : "tabler:copy"} className="h-4 w-4" />
      </button>
    )
  }
)
CopyButton.displayName = "CopyButton"

export { CopyButton }
export type { CopyButtonProps }
