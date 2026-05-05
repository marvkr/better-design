"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass Copy Button: glass pill button that copies text to clipboard

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
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "backdrop-blur-xl bg-white/[0.07] border border-white/[0.08]",
        "text-white/50 transition-all duration-300",
        "shadow-[inset_0_0_8px_rgba(255,255,255,0.07)]",
        "hover:bg-white/[0.12] hover:text-white/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.07)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255)]/40",
        className
      )}
      {...props}
    >
      {copied ? (
        <Icon icon="tabler:check" className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <Icon icon="tabler:copy" className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
