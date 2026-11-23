import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Spinner: a recessed ring with an ember arc that sweeps around it,
 * like a render in progress.
 */

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  label?: string
}

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-6 border-[0.1875rem]",
  xl: "size-8 border-[0.1875rem]",
}

function Spinner({ size = "md", label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="spinner"
      className={cn(
        "inline-block shrink-0 rounded-full border-muted border-t-primary",
        "animate-spin [animation-duration:0.8s] motion-reduce:[animation-duration:2.4s]",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

export { Spinner }
export type { SpinnerProps }
