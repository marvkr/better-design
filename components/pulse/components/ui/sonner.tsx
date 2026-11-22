"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Pulseboard Sonner: clean minimal toast notifications
// Uses bg-background, rounded-xl, ring-1 border

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:[box-shadow:var(--shadow-pop)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg",
          error: "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/30",
          success: "group-[.toaster]:text-[oklch(0.78_0.14_165)] group-[.toaster]:border-[oklch(0.72_0.15_165/0.4)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
