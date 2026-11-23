"use client"

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

/* Toasts are floating graphite panels with the system's floating shadow;
   the action is the ember button, the cancel is graphite. */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    theme="dark"
    className="group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-data-[sonner-toaster]:rounded-2xl group-data-[sonner-toaster]:border-0 group-data-[sonner-toaster]:bg-popover group-data-[sonner-toaster]:text-popover-foreground group-data-[sonner-toaster]:[box-shadow:var(--shadow-l)]",
        title: "group-[.toast]:text-sm group-[.toast]:font-medium",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:rounded-md group-[.toast]:[background:var(--ember-gradient)] group-[.toast]:text-primary-foreground group-[.toast]:[box-shadow:var(--shadow-primary)]",
        cancelButton:
          "group-[.toast]:rounded-md group-[.toast]:[background:var(--graphite-gradient)] group-[.toast]:text-secondary-foreground group-[.toast]:[box-shadow:var(--shadow-button)]",
      },
    }}
    {...props}
  />
)

export { Toaster }
