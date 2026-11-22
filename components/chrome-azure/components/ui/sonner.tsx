"use client"

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

/*
 * Chrome Azure Toaster — toasts render on the floating popover material with a
 * hairline rim and a soft ambient drop shadow. The action button wears the
 * azure alloy so it reads as the primary metal chip.
 */

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-lg group-[.toaster]:[box-shadow:var(--shadow-md)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:[background:var(--surface-on)] group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:[box-shadow:var(--shadow-primary)]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
