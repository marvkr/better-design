"use client"

import { Toaster as SonnerPrimitive, toast as sonnerToast, type ToasterProps } from "sonner"

import { fireHaptic } from "./haptics-provider"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-lg group-[.toaster]:[box-shadow:var(--shadow-l)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:[box-shadow:var(--shadow-button)]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  )
}

/*
 * Haptic-aware `toast`: fires the preset that matches each toast's intent
 * before delegating to sonner. success → success, error → error,
 * warning → warning, plain/info messages → light tick. All other sonner
 * methods (promise, loading, dismiss, custom) pass through unchanged.
 */
// SAFETY: Object.assign copies every sonnerToast member onto the wrapper,
// and each override keeps the signature it wraps.
const toast = Object.assign(
  (...args: Parameters<typeof sonnerToast>) => {
    fireHaptic("light")
    return sonnerToast(...args)
  },
  sonnerToast,
  {
    success: (...args: Parameters<typeof sonnerToast.success>) => {
      fireHaptic("success")
      return sonnerToast.success(...args)
    },
    error: (...args: Parameters<typeof sonnerToast.error>) => {
      fireHaptic("error")
      return sonnerToast.error(...args)
    },
    warning: (...args: Parameters<typeof sonnerToast.warning>) => {
      fireHaptic("warning")
      return sonnerToast.warning(...args)
    },
    info: (...args: Parameters<typeof sonnerToast.info>) => {
      fireHaptic("light")
      return sonnerToast.info(...args)
    },
  }
) as typeof sonnerToast

export { Toaster, toast }
