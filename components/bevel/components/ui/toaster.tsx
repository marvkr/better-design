"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "./use-toast"

/*
 * Bevel Toaster.
 *
 * The mount point that renders whatever `useToast` is holding. It carries no
 * styling of its own: the surface is the Toast card, the stack spacing is the
 * viewport's, and the title and description keep their own type steps. Drop it
 * once near the root of the app.
 */

/** Renders the live toast queue. Mount it once, near the app root. */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
