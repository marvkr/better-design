"use client"

import { Toaster as Sonner } from "sonner"

/* Sonner toasts render as velvet panels on the shared --shadow-l token. */

type ToasterProps = React.ComponentProps<typeof Sonner>

const SonnerToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:[background-image:var(--velour)] group-[.toaster]:text-foreground group-[.toaster]:border-0 group-[.toaster]:[box-shadow:var(--shadow-l)] group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:text-primary-foreground group-[.toast]:[background-image:var(--champagne)] group-[.toast]:[box-shadow:var(--shadow-primary)] group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:text-secondary-foreground group-[.toast]:[background-image:var(--velour-raised)] group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  )
}

export { SonnerToaster }
