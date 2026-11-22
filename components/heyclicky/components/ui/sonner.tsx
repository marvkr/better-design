"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:rounded-xl group-[.toaster]:shadow-[var(--shadow-window)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[image:var(--gradient-primary)] group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:shadow-[var(--shadow-control)]",
          cancelButton:
            "group-[.toast]:bg-[image:var(--gradient-silver)] group-[.toast]:text-secondary-foreground group-[.toast]:rounded-full group-[.toast]:shadow-[var(--shadow-button)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
