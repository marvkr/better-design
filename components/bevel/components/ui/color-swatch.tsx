"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel ColorSwatch.
 *
 * A tappable card that copies its value. The color block is a well pressed
 * into the card, so the swatch keeps its own edge without a border around it.
 * The copy glyph stays hidden until the card is hovered or focused, then
 * confirms with the check glyph for two seconds.
 */

/** Props for `ColorSwatch`; `color` is any CSS color the page can paint. */
export interface ColorSwatchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string
  name?: string
  showValue?: boolean
  onCopy?: () => void
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, color, name, showValue = true, onCopy, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
      if (!copied) return
      const timer = window.setTimeout(() => setCopied(false), 2000)
      return () => window.clearTimeout(timer)
    }, [copied])

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(color)
        setCopied(true)
        onCopy?.()
      } catch {
        // Copying is best effort, so a blocked clipboard stays silent.
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={copy}
        aria-label={`Copy color ${name ?? color}`}
        className={cn(
          "group flex flex-col items-start gap-2.5 rounded-[1.25rem] p-3.5 text-left",
          "bg-card text-card-foreground [box-shadow:var(--shadow-card)]",
          "transition-[box-shadow,transform] duration-base ease-out",
          "hover:[box-shadow:var(--shadow-card-hover)]",
          "active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        {...props}
      >
        <div
          className="h-14 w-full rounded-[0.75rem] [box-shadow:var(--shadow-inset)]"
          style={{ backgroundColor: color }}
        />
        <div className="flex w-full items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {name && (
              <div className="truncate text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[0.0188rem] text-foreground">
                {name}
              </div>
            )}
            {showValue && (
              <div className="truncate font-mono text-[0.6875rem] tracking-[0.0188rem] text-muted-foreground">
                {color}
              </div>
            )}
          </div>
          <Icon
            icon={copied ? "solar:check-read-linear" : "solar:copy-linear"}
            className={cn(
              "size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              copied && "text-primary opacity-100",
            )}
          />
        </div>
      </button>
    )
  },
)
ColorSwatch.displayName = "ColorSwatch"

export { ColorSwatch }
