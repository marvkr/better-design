"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onRatingChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "default" | "lg"
}

const sizes = {
  sm: "h-4 w-4",
  default: "h-5 w-5",
  lg: "h-6 w-6",
}

function StarIcon({
  filled,
  className,
}: {
  filled: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
    </svg>
  )
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    { className, value = 0, max = 5, onRatingChange, readOnly, size = "default", ...props },
    ref
  ) => {
    const [hover, setHover] = React.useState<number | null>(null)

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-0.5", className)}
        role="group"
        aria-label={`Rating: ${value} out of ${max}`}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1
          const active = (hover ?? value) >= starValue

          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              onMouseEnter={() => !readOnly && setHover(starValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
              onClick={() => !readOnly && onRatingChange?.(starValue)}
              className={cn(
                "rounded-sm p-0.5 transition-[color,transform] duration-fast",
                !readOnly &&
                  "cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                readOnly && "cursor-default"
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <StarIcon
                filled={active}
                className={cn(
                  sizes[size],
                  active
                    ? "text-primary drop-shadow-[0_0.0625rem_0.125rem_oklch(0_0_0/0.5)]"
                    : "text-muted-foreground/40"
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
