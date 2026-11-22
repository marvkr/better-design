"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"

// Amber Glass Sonner: glass toast surface via CSS variables.

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        // SAFETY: CSS custom properties are valid inline style keys that
        // CSSProperties cannot spell.
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--ag-border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:backdrop-blur-[var(--ag-blur)] group-[.toaster]:shadow-[var(--shadow-popover)] group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[image:var(--ag-primary-grad)] group-[.toast]:text-primary-foreground group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-[var(--ag-fill)] group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
