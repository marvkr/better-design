"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Gauge Dark Sonner: toasts as floating readout panels with the deep popover
// shadow; action buttons wear the gold control.

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-[var(--shadow-pop)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:border group-[.toast]:border-[var(--gauge-rim)]",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          error:
            "group-[.toaster]:text-[oklch(0.78_0.14_25)] group-[.toaster]:border-destructive/40",
          success:
            "group-[.toaster]:text-[var(--gauge-ok)] group-[.toaster]:border-[oklch(0.74_0.12_152/0.35)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
