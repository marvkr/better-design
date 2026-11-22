"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ColorSwatchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string
  name?: string
  showValue?: boolean
  onCopy?: () => void
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, color, name, showValue = true, onCopy, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(color)
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Silent fail — copy is best-effort
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={copy}
        className={cn(
          "group flex flex-col items-start gap-2 rounded-xl p-3 text-left",
          "bg-card text-card-foreground border border-white/10",
          "[box-shadow:var(--shadow-sm)]",
          "transition-[background-color,box-shadow,transform] duration-base",
          "hover:[box-shadow:var(--shadow-md)] hover:border-white/15",
          "active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          className
        )}
        aria-label={`Copy color ${name ?? color}`}
        {...props}
      >
        <div
          className={cn(
            "w-full h-14 rounded-lg border border-white/10",
            "[box-shadow:var(--shadow-inset)]"
          )}
          style={{ backgroundColor: color }}
        />
        <div className="w-full flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {name && <div className="text-xs font-medium truncate">{name}</div>}
            {showValue && (
              <div className="text-[0.625rem] font-mono text-muted-foreground truncate">{color}</div>
            )}
          </div>
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5 text-primary opacity-100 transition-opacity duration-fast" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
          )}
        </div>
      </button>
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"

export { ColorSwatch }
