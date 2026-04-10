import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Spinner: rounded circle with colored border-t, scale press animation

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive"
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-10 w-10 border-[3px]",
}

const colorClasses = {
  default:     "border-secondary border-t-foreground",
  primary:     "border-primary/30 border-t-primary",
  secondary:   "border-accent/30 border-t-accent",
  success:     "border-[hsl(var(--success)/0.3)] border-t-[hsl(var(--success))]",
  warning:     "border-[hsl(var(--warning)/0.3)] border-t-[hsl(var(--warning))]",
  destructive: "border-destructive/30 border-t-destructive",
}

function Spinner({ size = "md", color = "primary", className, ...props }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    />
  )
}

export { Spinner }
export type { SpinnerProps }
