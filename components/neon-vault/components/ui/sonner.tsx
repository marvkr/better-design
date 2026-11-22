"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Neon Vault Sonner: toasts as floating vault panels. Elevated dark popover
// surface with the layered DS shadow, rounded-2xl shell, magenta pill action.

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-foreground group-[.toaster]:rounded-2xl group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:[box-shadow:var(--shadow-popover)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:[background-image:var(--gradient-primary)] group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:[box-shadow:var(--shadow-button)]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
          error:
            "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/30",
          success:
            "group-[.toaster]:text-chart-5 group-[.toaster]:border-chart-5/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
