"use client"

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"

/*
 * Bevel Sonner.
 *
 * The same card the Radix toast uses, handed to sonner through its class
 * slots: 20px radius, no border, var(--shadow-lg). The action button reuses
 * the primary Button gradient so it reads as the same material, and the
 * cancel button sits in the pressed inner well beside it. The theme is left
 * to the caller, because light and dark swap tokens rather than components.
 */

const Toaster = ({ className, ...props }: ToasterProps) => (
  <SonnerPrimitive
    className={cn("toaster group", className)}
    toastOptions={{
      classNames: {
        toast: [
          "group toast",
          "group-[.toaster]:bg-card group-[.toaster]:text-card-foreground",
          "group-[.toaster]:rounded-[1.25rem] group-[.toaster]:border-none",
          "group-[.toaster]:p-[1.125rem]",
          "group-[.toaster]:[box-shadow:var(--shadow-lg)]",
          "group-[.toaster]:text-[0.9063rem] group-[.toaster]:tracking-[0.0188rem]",
        ].join(" "),
        title:
          "group-[.toast]:text-[0.9063rem] group-[.toast]:font-semibold group-[.toast]:tracking-[-0.0125rem]",
        description:
          "group-[.toast]:text-[0.7813rem] group-[.toast]:leading-4 group-[.toast]:tracking-[0.0188rem] group-[.toast]:text-muted-foreground",
        actionButton: [
          "group-[.toast]:h-9 group-[.toast]:rounded-[0.625rem] group-[.toast]:px-3.5",
          "group-[.toast]:text-[0.8125rem] group-[.toast]:font-semibold",
          "group-[.toast]:text-primary-foreground",
          "group-[.toast]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
          "group-[.toast]:[box-shadow:var(--shadow-primary)]",
        ].join(" "),
        cancelButton: [
          "group-[.toast]:h-9 group-[.toast]:rounded-[0.625rem] group-[.toast]:px-3.5",
          "group-[.toast]:text-[0.8125rem] group-[.toast]:font-semibold",
          "group-[.toast]:bg-[var(--inner)] group-[.toast]:text-[var(--strong)]",
          "group-[.toast]:[box-shadow:var(--shadow-inset)]",
        ].join(" "),
        closeButton:
          "group-[.toast]:rounded-full group-[.toast]:border-none group-[.toast]:bg-[var(--inner)] group-[.toast]:text-muted-foreground",
        error: "group-[.toaster]:text-destructive",
        success: "group-[.toaster]:text-[var(--success)]",
        warning: "group-[.toaster]:text-[var(--warning)]",
        info: "group-[.toaster]:text-primary",
      },
    }}
    {...props}
  />
)

export { Toaster }
