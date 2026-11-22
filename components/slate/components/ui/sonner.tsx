"use client"

import { Toaster as Sonner } from "sonner"

/*
 * Ops Sharp Sonner — crisp white toasts. White popover surface, hairline border,
 * sharp 8px corner, and the DS popover shadow. Success/error states tint with
 * the DS success + destructive tokens, never raw color utilities.
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:[box-shadow:var(--shadow-popover)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-md",
          error:
            "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/30",
          success:
            "group-[.toaster]:text-success group-[.toaster]:border-success/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
