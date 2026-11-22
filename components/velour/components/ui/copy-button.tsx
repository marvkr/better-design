"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

/* A small raised velour disc; copies text to the clipboard. */

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
        "inline-flex h-8 w-8 items-center justify-center rounded-md",
        "[background-image:var(--velour-raised)] [box-shadow:var(--shadow-button)]",
        "text-muted-foreground transition-[background-image,box-shadow,color] duration-fast",
        "hover:[background-image:var(--velour-hover)] hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
        "active:translate-y-px active:[box-shadow:var(--shadow-s)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
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
