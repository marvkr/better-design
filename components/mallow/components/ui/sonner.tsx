"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

/**
 * Mallow Toaster (Sonner): each toast is the white floating panel with its
 * soft plum drop. The action is a small violet pill and cancel a violet-tinted chip.
 * Sonner ships unlayered styles, so these classes carry the important flag.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      icons={{
        success: <Icon icon="iconoir:check-circle" className="size-4 text-success" />,
        info: <Icon icon="iconoir:info-circle" className="size-4 text-info" />,
        warning: <Icon icon="iconoir:warning-triangle" className="size-4 text-warning-text" />,
        error: <Icon icon="iconoir:warning-circle" className="size-4 text-destructive" />,
        loading: (
          <span
            aria-hidden="true"
            className="block size-4 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground motion-reduce:animate-pulse"
          />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-lg! border-0! bg-popover! font-sans text-popover-foreground! shadow-(--shadow-menu)!",
          title: "font-medium!",
          description: "text-muted-foreground!",
          actionButton:
            "rounded-full! bg-(image:--violet-face)! font-medium! text-primary-foreground! shadow-(--violet-edge)! hover:bg-(image:--violet-face-hover)!",
          cancelButton: "rounded-full! bg-(--option-face)! text-foreground! shadow-(--option-edge)!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
