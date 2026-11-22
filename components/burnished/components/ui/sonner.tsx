"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

/**
 * Burnished Toaster (Sonner): each toast is the shared floating panel, the
 * raised umber plate with a lit top edge, a dark rim and 0.875rem corners.
 * The action is a small cream pill; cancel is a graphite bevel. Sonner
 * ships its own unlayered styles, so these classes carry the important flag.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerPrimitive
      icons={{
        success: <Icon icon="ph:check-circle" className="size-4 text-success" />,
        info: <Icon icon="ph:info" className="size-4 text-info" />,
        warning: <Icon icon="ph:warning" className="size-4 text-warning" />,
        error: <Icon icon="ph:warning-circle" className="size-4 text-destructive" />,
        loading: <Icon icon="ph:spinner-gap" className="size-4 animate-spin text-muted-foreground" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-lg! border-0! bg-popover! font-sans text-popover-foreground! shadow-(--bevel-menu)!",
          title: "font-semibold!",
          description: "text-muted-foreground!",
          actionButton:
            "rounded-full! bg-(image:--fill-primary)! font-semibold! text-primary-foreground! shadow-(--bevel-primary)!",
          cancelButton:
            "rounded-full! bg-(image:--fill-raised)! text-foreground! shadow-(--bevel-raised)!",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
