"use client"

import { Toaster as Sonner } from "sonner"

// Leather Luxe Sonner: toasts as floating glass card slips with the DS
// popover depth; actions wear the cognac leather pill.

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-highlight group-[.toaster]:[box-shadow:var(--shadow-popover)] group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:[background-image:var(--gradient-leather)] group-[.toast]:text-primary-foreground group-[.toast]:rounded-full",
          cancelButton:
            "group-[.toast]:[background-image:var(--gradient-raised)] group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
