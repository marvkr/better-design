"use client"

import { Toaster as Sonner } from "sonner"

// Control Room Sonner: stacked event toasts on the console plate
// surface with the shared popover glow elevation.

type ToasterProps = React.ComponentProps<typeof Sonner>

const SonnerToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:[box-shadow:var(--shadow-popover)] group-[.toaster]:rounded-md",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-sm group-[.toast]:uppercase group-[.toast]:tracking-wider",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-sm group-[.toast]:uppercase group-[.toast]:tracking-wider",
        },
      }}
      {...props}
    />
  )
}

export { SonnerToaster }
