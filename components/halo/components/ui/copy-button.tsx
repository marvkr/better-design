"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Copy Button: translucent pill button that copies text to clipboard

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
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "backdrop-blur-xl bg-foreground/[0.08] border border-border",
        "text-foreground/50 transition-all duration-base",
        "shadow-[inset_0_0_0.5rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
        "hover:bg-foreground/[0.14] hover:text-foreground/80 hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40",
        className
      )}
      {...props}
    >
      {copied ? (
        <Icon icon="tabler:check" className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Icon icon="tabler:copy" className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
