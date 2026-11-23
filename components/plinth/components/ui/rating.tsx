"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Plinth Rating: Feather stars. Filled stars take the ember accent; empty
 * ones are muted outlines on the stage.
 */

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
}

function Rating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = "md",
  className,
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="radiogroup"
      aria-label={props["aria-label"] ?? "Rating"}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = hovered !== null ? starValue <= hovered : starValue <= value

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className={cn(
              "rounded-md p-0.5 transition-[scale] duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              readonly ? "cursor-default" : "cursor-pointer motion-safe:hover:scale-110"
            )}
          >
            <StarIcon
              className={cn(
                sizeClasses[size],
                "transition-colors duration-fast",
                filled ? "fill-primary text-primary" : "fill-transparent text-muted-foreground/50"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

// feather:star
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01z" />
    </svg>
  )
}

export { Rating }
export type { RatingProps }
