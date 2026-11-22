"use client"

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-lg group-[.toaster]:[box-shadow:var(--shadow-pop)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:[background-image:var(--cobalt)] group-[.toast]:[box-shadow:var(--shadow-primary)]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
