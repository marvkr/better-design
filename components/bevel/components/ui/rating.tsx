"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Rating.
 *
 * A row of stars in the one accent. A filled star is the solid glyph in the
 * primary blue and an empty one is the outline in the track tone, so the score
 * reads at a glance without a second colour entering the screen. Hovering
 * previews the value it would set. Pass `readOnly` to show a score you cannot
 * change: the buttons then stop responding and lose their hover.
 */

/** Props for `Rating`; omit `onRatingChange` and pass `readOnly` to display. */
export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onRatingChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "default" | "lg"
}

const starSize = {
  sm: "size-[1.0625rem]",
  default: "size-[1.25rem]",
  lg: "size-[1.5rem]",
} as const

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      max = 5,
      onRatingChange,
      readOnly,
      size = "default",
      ...props
    },
    ref,
  ) => {
    const [hover, setHover] = React.useState<number | null>(null)

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`Rating: ${value} out of ${max}`}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1
          const active = (hover ?? value) >= starValue

          return (
            <button
              key={starValue}
              type="button"
              disabled={readOnly}
              onMouseEnter={() => !readOnly && setHover(starValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
              onClick={() => !readOnly && onRatingChange?.(starValue)}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              className={cn(
                "rounded-[0.5rem] p-0.5 transition-transform duration-fast ease-out",
                !readOnly &&
                  "cursor-pointer hover:scale-110 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                readOnly && "cursor-default",
              )}
            >
              <Icon
                icon={active ? "solar:star-bold-duotone" : "solar:star-linear"}
                className={cn(
                  starSize[size],
                  active ? "text-primary" : "text-[var(--track)]",
                )}
              />
            </button>
          )
        })}
      </div>
    )
  },
)
Rating.displayName = "Rating"

export { Rating }
