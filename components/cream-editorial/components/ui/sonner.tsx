"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

const focusRing = "outline-none focus-visible:ring-3 focus-visible:ring-ring";

/**
 * Cream editorial Toaster for sonner: a slip of the lightest paper with
 * Phosphor status icons.
 *
 * Sonner's own look is switched off and every part is styled here, so the
 * toast is the same floating panel as a menu: pale paper, a 0.75rem corner
 * and the soft hairline shadow. Only the status icon takes a colour. The
 * action is a warm ink block and cancel is an oat one, so neither competes
 * with the screen's one terracotta action.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="ph:check-circle" aria-hidden="true" />,
      info: <Icon icon="ph:info" aria-hidden="true" />,
      warning: <Icon icon="ph:warning" aria-hidden="true" />,
      error: <Icon icon="ph:warning-circle" aria-hidden="true" />,
      loading: (
        <Icon icon="ph:spinner-gap" className="animate-spin" aria-hidden="true" />
      ),
      close: <Icon icon="ph:x" aria-hidden="true" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-(--width) items-start gap-3 rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-(--shadow-menu)",
        content: "flex min-w-0 flex-1 flex-col gap-0.5",
        title: "font-medium leading-snug text-foreground",
        description: "text-(--foreground-secondary)",
        icon: "mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background transition-colors duration-fast ease-out hover:bg-foreground/85 ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-md bg-secondary px-3 text-sm font-medium text-secondary-foreground transition-colors duration-fast ease-out hover:bg-muted ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground [&_svg]:size-3.5 ${focusRing}`,
        success: "[&_[data-icon]]:text-(--success-text)",
        error: "[&_[data-icon]]:text-(--destructive-text)",
        warning: "[&_[data-icon]]:text-(--warning-text)",
        info: "[&_[data-icon]]:text-(--info-text)",
      },
    }}
    {...props}
  />
);

export { Toaster };
