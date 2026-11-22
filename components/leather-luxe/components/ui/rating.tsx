"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

// Leather Luxe Rating: filled stars glow warm cognac, like brass studs.

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, onChange, readonly = false, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(-1)

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-0.5", className)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const filled = i < (hovered >= 0 ? hovered + 1 : value)
          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              aria-label={`Rate ${i + 1} ${i === 0 ? "star" : "stars"}`}
              aria-pressed={value >= i + 1}
              className={cn(
                "transition-transform duration-base",
                !readonly && "cursor-pointer hover:scale-110",
                "disabled:cursor-default",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:rounded-sm"
              )}
              onMouseEnter={() => !readonly && setHovered(i)}
              onMouseLeave={() => !readonly && setHovered(-1)}
              onClick={() => onChange?.(i + 1)}
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  filled
                    ? "fill-[oklch(0.68_0.12_60)] text-[oklch(0.68_0.12_60)] drop-shadow-[0_0.0625rem_0.1875rem_oklch(0.55_0.115_52/0.5)]"
                    : "fill-transparent text-muted-foreground/40"
                )}
              />
            </button>
          )
        })}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating }
