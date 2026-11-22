"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Precision Sonner: clean light toast surface on the shared popover material
// (white popover, hairline border, small radius, whisper-soft drop).

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:rounded-md group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-[var(--shadow-popover)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-accent group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          error: "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/30",
          success:
            "group-[.toaster]:text-[oklch(0.55_0.13_152)] group-[.toaster]:border-[oklch(0.85_0.09_152)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
