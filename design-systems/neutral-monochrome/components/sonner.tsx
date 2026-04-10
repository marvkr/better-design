"use client"

import * as React from "react"
import { Toaster as SonnerToaster } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme="dark"
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: [
            "group toast rounded-[10px] border border-border bg-card text-foreground shadow-xl",
            "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border",
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-lg",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground rounded-lg",
          closeButton:
            "group-[.toast]:border-border group-[.toast]:bg-card group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-primary/30",
          error: "group-[.toaster]:border-destructive/30",
          warning: "group-[.toaster]:border-orange-500/30",
          info: "group-[.toaster]:border-primary/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
