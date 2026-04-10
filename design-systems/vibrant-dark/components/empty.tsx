import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Empty: dark theme, vibrant accent circle for icon, rounded-2xl container
// Glowing icon area with colored shadow, pill action button

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  color?: "primary" | "secondary" | "success" | "warning" | "destructive"
}

const colorMap = {
  primary: {
    icon: "bg-primary/20 text-primary",
    glow: "shadow-[0_0_24px_hsl(212_100%_47%/0.25)]",
    ring: "ring-primary/20",
  },
  secondary: {
    icon: "bg-accent/30 text-accent-foreground",
    glow: "shadow-[0_0_24px_hsl(270_59%_58%/0.25)]",
    ring: "ring-accent/20",
  },
  success: {
    icon: "bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]",
    glow: "shadow-[0_0_24px_hsl(146_80%_44%/0.25)]",
    ring: "ring-[hsl(var(--success)/0.2)]",
  },
  warning: {
    icon: "bg-[hsl(var(--warning)/0.2)] text-[hsl(var(--warning))]",
    glow: "",
    ring: "ring-[hsl(var(--warning)/0.2)]",
  },
  destructive: {
    icon: "bg-destructive/20 text-destructive",
    glow: "shadow-[0_0_24px_hsl(339_90%_51%/0.25)]",
    ring: "ring-destructive/20",
  },
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, action, color = "primary", className, ...props }, ref) => {
    const colors = colorMap[color]

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-6",
          "rounded-2xl border border-border bg-card/50 p-12 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              "ring-2",
              colors.icon,
              colors.glow,
              colors.ring,
              "[&>svg]:h-7 [&>svg]:w-7"
            )}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-2 max-w-xs">
          <p className="text-base font-semibold text-foreground">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-3">
            {action}
          </div>
        )}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty }
export type { EmptyProps }
