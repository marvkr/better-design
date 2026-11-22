"use client";

import { Toaster as Sonner } from "sonner";

// Hyperline Sonner: toasts styled with the shared pop-surface tokens.

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border/60 group-[.toaster]:shadow-[var(--hl-shadow-pop)] group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[image:var(--hl-primary-gradient)] group-[.toast]:text-primary-foreground group-[.toast]:shadow-[var(--hl-shadow-primary-sm)]",
          cancelButton: "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
