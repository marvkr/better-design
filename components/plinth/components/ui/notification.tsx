import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Notification: a status panel at the top of a view. It sits in the
 * page, so it is a card with a hairline ring, never a shadow; the tone lives
 * in a small recessed icon well on the left.
 */

const notificationVariants = cva(
  "relative flex gap-3 rounded-2xl border bg-card p-3.5 text-card-foreground " +
    "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.045)]",
  {
    variants: {
      variant: {
        default: "border-border",
        info: "border-[oklch(0.67_0.16_246/0.35)]",
        success: "border-[oklch(0.72_0.17_150/0.35)]",
        warning: "border-[oklch(0.8_0.15_80/0.35)]",
        destructive: "border-[oklch(0.62_0.2_25/0.45)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tone = {
  default: { Glyph: BellIcon, color: "text-muted-foreground" },
  info: { Glyph: InfoIcon, color: "text-[oklch(0.75_0.13_246)]" },
  success: { Glyph: CheckCircleIcon, color: "text-[oklch(0.8_0.15_150)]" },
  warning: { Glyph: AlertTriangleIcon, color: "text-[oklch(0.85_0.14_80)]" },
  destructive: { Glyph: AlertCircleIcon, color: "text-[oklch(0.75_0.15_25)]" },
} as const

export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  onDismiss?: () => void
  actions?: React.ReactNode
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant = "default", title, description, icon, onDismiss, actions, children, ...props }, ref) => {
    const { Glyph, color } = tone[variant ?? "default"]
    return (
      <div ref={ref} role="status" className={cn(notificationVariants({ variant }), className)} {...props}>
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg bg-input [box-shadow:var(--shadow-inset)] [&_svg]:size-4",
            color
          )}
        >
          {icon ?? <Glyph />}
        </div>
        <div className="min-w-0 flex-1 self-center">
          {title && <div className="text-sm font-medium leading-snug text-foreground">{title}</div>}
          {description && (
            <div className={cn("text-sm leading-relaxed text-muted-foreground", title && "mt-0.5")}>{description}</div>
          )}
          {children && <div className="text-sm leading-relaxed text-foreground">{children}</div>}
          {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground",
              "transition-colors duration-fast hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

// feather:bell
function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

// feather:info
function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></g>
    </svg>
  )
}

// feather:check-circle
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></g>
    </svg>
  )
}

// feather:alert-triangle
function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0M12 9v4m0 4h.01" />
    </svg>
  )
}

// feather:alert-circle
function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></g>
    </svg>
  )
}

// feather:x
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export { Notification }
