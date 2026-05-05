"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface ColorSwatchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string
  name?: string
  showValue?: boolean
  onCopy?: () => void
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
          "group flex flex-col items-start gap-2 rounded-lg p-3 text-left",
          "bg-card text-card-foreground border border-border",
          "[box-shadow:var(--shadow-s)]",
          "transition-[background-color,box-shadow] duration-200",
          "hover:bg-accent hover:[box-shadow:var(--shadow-m)]",
          "active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          className
        )}
        aria-label={`Copy color ${name ?? color}`}
        {...props}
      >
        <div
          className={cn(
            "w-full h-14 rounded-md border border-border",
            "[box-shadow:var(--shadow-inset)]"
          )}
          style={{ backgroundColor: color }}
        />
        <div className="w-full flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {name && <div className="text-xs font-medium truncate">{name}</div>}
            {showValue && (
              <div className="text-[10px] font-mono text-muted-foreground truncate">{color}</div>
            )}
          </div>
          <Icon
            icon={copied ? "tabler:check" : "tabler:copy"}
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity duration-150",
              "group-hover:opacity-100",
              copied && "opacity-100 text-primary"
            )}
          />
        </div>
      </button>
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"

export { ColorSwatch }
