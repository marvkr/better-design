"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

/**
 * Paddock Toaster (Sonner): each toast is the shared floating panel, white
 * with a faint drop and small rounded corners. The action is the teal
 * primary button and cancel the quiet grey chip. Sonner ships its own unlayered styles,
 * so these classes carry the important flag.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      icons={{
        success: <Icon icon="mingcute:check-circle-line" className="size-4 text-success" />,
        info: <Icon icon="mingcute:information-line" className="size-4 text-info" />,
        warning: <Icon icon="mingcute:warning-line" className="size-4 text-warning-text" />,
        error: <Icon icon="mingcute:close-circle-line" className="size-4 text-destructive" />,
        loading: <Icon icon="mingcute:loading-line" className="size-4 animate-spin text-muted-foreground" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-lg! border-0! bg-popover! font-sans text-popover-foreground! shadow-(--shadow-menu)!",
          title: "font-semibold!",
          description: "text-muted-foreground!",
          actionButton:
            "rounded-md! bg-primary! font-medium! text-primary-foreground! shadow-(--primary-face)!",
          cancelButton:
            "rounded-md! bg-secondary! text-secondary-foreground! shadow-(--plate-ring)!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
