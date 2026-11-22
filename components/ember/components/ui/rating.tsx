"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass Rating: amber stars with a soft glow on the filled run.

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-6 w-6",
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, onChange, readonly, size = "md", ...props }, ref) => {
    const [hovered, setHovered] = React.useState<number | null>(null)
    const display = hovered ?? value

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        className={cn("inline-flex items-center gap-1", className)}
        onMouseLeave={() => setHovered(null)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const filled = i < display
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={value === i + 1}
              aria-label={`${i + 1} of ${max}`}
              disabled={readonly}
              onClick={() => onChange?.(i + 1)}
              onMouseEnter={() => !readonly && setHovered(i + 1)}
              className={cn(
                "rounded-sm transition-transform duration-fast",
                !readonly && "cursor-pointer hover:scale-110",
                readonly && "cursor-default",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              )}
            >
              <Icon
                icon={filled ? "tabler:star-filled" : "tabler:star"}
                className={cn(
                  sizeClasses[size],
                  filled
                    ? "text-primary drop-shadow-[0_0_0.375rem_oklch(0.69_0.195_42/0.5)]"
                    : "text-muted-foreground/50"
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
export type { RatingProps }
