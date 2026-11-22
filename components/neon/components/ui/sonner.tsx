"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Dark Neon AI Sonner: floating toasts on the popover surface.
// bg-popover, rounded-[0.75rem], hairline border, soft layered popover shadow
// (the single floating-surface token). Action button reuses the neon primary.

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:rounded-[0.75rem] group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:[box-shadow:var(--shadow-popover)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:[background:var(--neon-gradient)] group-[.toast]:text-primary-foreground group-[.toast]:rounded-[0.5rem]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-[0.5rem]",
          error:
            "group-[.toaster]:text-destructive group-[.toaster]:border-[oklch(0.62_0.23_25_/_0.4)]",
          success:
            "group-[.toaster]:text-primary group-[.toaster]:border-[oklch(0.86_0.22_145_/_0.4)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
