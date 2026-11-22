"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

/**
 * Margin Toaster (Sonner): each toast wears the white floating panel every
 * menu shares, with the light popover shadow. The action is the small oxblood
 * button and cancel the ruled toolbar tab. Sonner ships unlayered styles,
 * so these classes carry the important flag.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      icons={{
        success: <Icon icon="solar:check-circle-linear" className="size-4 text-success" aria-hidden />,
        info: <Icon icon="solar:info-circle-linear" className="size-4 text-info" aria-hidden />,
        warning: <Icon icon="solar:danger-triangle-linear" className="size-4 text-warning" aria-hidden />,
        error: <Icon icon="solar:danger-circle-linear" className="size-4 text-destructive" aria-hidden />,
        loading: (
          <Icon
            icon="solar:refresh-linear"
            className="size-4 text-muted-foreground motion-safe:animate-spin"
            aria-hidden
          />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl! border-0! bg-popover! p-3! font-sans text-sm! text-popover-foreground! shadow-md!",
          title: "font-medium!",
          description: "text-muted-foreground!",
          actionButton:
            "h-7! rounded-lg! bg-primary! px-2.5! font-medium! text-primary-foreground! shadow-xs!",
          cancelButton: "h-7! rounded-lg! bg-card! px-2.5! text-foreground! shadow-sm!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
