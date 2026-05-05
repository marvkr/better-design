"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

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
 "rounded-none p-0.5 transition-[color,transform] duration-150",
 !readOnly && "cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
 readOnly && "cursor-default"
 )}
 aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
 >
 <Icon
 icon={active ? "tabler:star-filled" : "tabler:star"}
 className={cn(
 sizes[size],
 active ? "text-primary" : "text-muted-foreground/40"
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
