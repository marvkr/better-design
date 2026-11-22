"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"

// Luxe Sonner: Sonner Toaster wrapper — card bg, rounded-xl, dark monochromatic style
// Matches the premium dark aesthetic with warm gray text

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ className, ...props }: ToasterProps & { className?: string }) {
  return (
    <Sonner
      theme="dark"
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: [
            "group toast",
            "group-[.toaster]:rounded-xl",
            "group-[.toaster]:border group-[.toaster]:border-border/60",
            "group-[.toaster]:bg-card",
            "group-[.toaster]:text-foreground",
            "group-[.toaster]:shadow-xl",
            "group-[.toaster]:text-sm group-[.toaster]:tracking-wide",
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:text-xs",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:text-xs",
          closeButton:
            "group-[.toast]:bg-secondary group-[.toast]:border-border group-[.toast]:text-muted-foreground hover:group-[.toast]:text-foreground",
          error:
            "group-[.toaster]:border-destructive/30 group-[.toaster]:bg-destructive/10",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
