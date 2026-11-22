"use client"

import * as React from "react"
import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-lg group-[.toaster]:[box-shadow:var(--shadow-lg)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:text-primary-foreground group-[.toast]:bg-[image:var(--pill-gradient)] group-[.toast]:hover:bg-[image:var(--pill-gradient-hover)] group-[.toast]:rounded-md group-[.toast]:[box-shadow:var(--shadow-pill)] group-[.toast]:hover:[box-shadow:var(--shadow-pill-hover)] group-[.toast]:active:translate-y-px",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-md group-[.toast]:[box-shadow:var(--shadow-tile)] group-[.toast]:hover:bg-accent",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
