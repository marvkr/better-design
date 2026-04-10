"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: [
            "group toast",
            "group-[.toaster]:bg-background",
            "group-[.toaster]:text-foreground",
            "group-[.toaster]:border group-[.toaster]:border-border",
            "group-[.toaster]:shadow-sm",
            "group-[.toaster]:rounded-[14px]",
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl",
          error:
            "group-[.toaster]:border-destructive/20 group-[.toaster]:bg-destructive/5",
          success:
            "group-[.toaster]:border-green-500/20 group-[.toaster]:bg-green-50",
          warning:
            "group-[.toaster]:border-amber-400/20 group-[.toaster]:bg-amber-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
