"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Notification.
 *
 * A banner that sits at the top of a screen, so it is a card lifted one step:
 * 20px radius, no border, var(--shadow-lg). The variant is carried by a
 * tinted glyph chip on the left, one of the pop tokens at the 12px chip
 * radius, which is how this system marks state without a colored rule or a
 * colored surface. The dismiss control is a round icon button, so it matches
 * every other row action.
 */

/* The surface is the same for every variant, because the chip carries state. */
const notificationSurface = [
  "relative flex gap-3 rounded-[1.25rem] p-[1.125rem]",
  "bg-card text-card-foreground",
  "[box-shadow:var(--shadow-lg)]",
  "transition-[box-shadow] duration-fast ease-out",
].join(" ")

/* The chip carries the whole variant: a pop tint behind a Solar glyph. */
const iconMap = {
  default: {
    icon: "solar:bell-linear",
    chip: "bg-[var(--inner)] text-[var(--strong)]",
  },
  info: {
    icon: "solar:info-circle-linear",
    chip: "bg-[var(--pop-blue)] text-[var(--pop-blue-foreground)]",
  },
  success: {
    icon: "solar:check-circle-linear",
    chip: "bg-[var(--pop-green)] text-[var(--pop-green-foreground)]",
  },
  warning: {
    icon: "solar:danger-triangle-linear",
    chip: "bg-[var(--pop-yellow)] text-[var(--pop-yellow-foreground)]",
  },
  destructive: {
    icon: "solar:danger-circle-linear",
    chip: "bg-[var(--pop-orange)] text-[var(--pop-orange-foreground)]",
  },
} as const

/** The state a notification reports, shown as the tint of its glyph chip. */
export type NotificationVariant = keyof typeof iconMap

/** Props for `Notification`. Pass `onDismiss` to show the close control. */
export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: NotificationVariant
  title?: React.ReactNode
  description?: React.ReactNode
  /** Replaces the variant's glyph, keeping the tinted chip around it. */
  icon?: React.ReactNode
  onDismiss?: () => void
  actions?: React.ReactNode
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      icon,
      onDismiss,
      actions,
      children,
      ...props
    },
    ref,
  ) => {
    const meta = iconMap[variant]

    return (
      <div ref={ref} className={cn(notificationSurface, className)} {...props}>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-[0.75rem]",
            meta.chip,
          )}
        >
          {icon ?? <Icon icon={meta.icon} className="size-[1.1875rem]" />}
        </div>
        <div className="min-w-0 flex-1">
          {title && (
            <div className="text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem] text-foreground">
              {title}
            </div>
          )}
          {description && (
            <div
              className={cn(
                "text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
                title && "mt-1",
              )}
            >
              {description}
            </div>
          )}
          {children}
          {actions && (
            <div className="mt-3 flex items-center gap-2">{actions}</div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "flex size-[1.875rem] shrink-0 items-center justify-center rounded-full",
              "text-muted-foreground",
              "transition-[background-color,color] duration-fast ease-out",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <Icon icon="solar:close-circle-linear" className="size-4" />
          </button>
        )}
      </div>
    )
  },
)
Notification.displayName = "Notification"

export { Notification }
