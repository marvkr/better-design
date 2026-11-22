"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/*
 * Interior sonner toasts are floating panels: an 11px-radius card carried by
 * the popover float shadow, no border. The action is the ink primary button
 * scaled down; the cancel is a cap.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:rounded-[0.6875rem] group-[.toaster]:border-0 group-[.toaster]:shadow-[var(--shadow-float-popover)]",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-[0.375rem] group-[.toast]:shadow-[var(--shadow-thumb)]",
        cancelButton:
          "group-[.toast]:bg-card group-[.toast]:text-foreground group-[.toast]:rounded-[0.375rem] group-[.toast]:shadow-[var(--shadow-cap)]",
      },
    }}
    {...props}
  />
);

export { Toaster };
