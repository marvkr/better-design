"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Apple Sonner: clean minimal toast notifications
// Uses bg-background, rounded-[0.75rem], ring-1 border

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[oklch(1_0_0/0.82)] group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:rounded-[calc(0.875rem*var(--corner-factor,1))] group-[.toaster]:border group-[.toaster]:border-[oklch(1_0_0/0.6)] group-[.toaster]:shadow-[0_0.25rem_1rem_0_oklch(0_0_0/0.08),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg",
          error: "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/30",
          success: "group-[.toaster]:text-emerald-700 group-[.toaster]:border-emerald-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
