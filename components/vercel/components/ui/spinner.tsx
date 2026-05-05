import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel Spinner: circular loading indicator
// Sizes: sm (16px), md (20px), lg (24px), xl (32px)

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-2",
  xl: "h-8 w-8 border-[3px]",
}

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-border border-t-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner }
export type { SpinnerProps }
