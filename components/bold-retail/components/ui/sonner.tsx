"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Bold retail Toaster for sonner: white toasts with line status icons.
 *
 * Sonner's own look is switched off and every part is styled here, so a
 * toast is the same floating white panel as a menu. Only the status icon
 * takes a colour. The action is the black pill and cancel the grey one.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="mingcute:check-circle-line" aria-hidden="true" />,
      info: <Icon icon="mingcute:information-line" aria-hidden="true" />,
      warning: <Icon icon="mingcute:warning-line" aria-hidden="true" />,
      error: <Icon icon="mingcute:close-circle-line" aria-hidden="true" />,
      loading: (
        <Icon icon="mingcute:loading-3-line" className="animate-spin" aria-hidden="true" />
      ),
      close: <Icon icon="mingcute:close-line" aria-hidden="true" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-(--width) items-start gap-3 rounded-xl bg-popover p-4 text-sm text-popover-foreground shadow-(--shadow-menu)",
        content: "flex min-w-0 flex-1 flex-col gap-1",
        title: "text-base font-medium leading-snug",
        description: "text-muted-foreground",
        icon: "mt-0.5 flex size-5 shrink-0 items-center justify-center text-foreground [&_svg]:size-5",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-full bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors duration-fast ease-out hover:bg-(--primary-hover) ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-full bg-secondary px-3.5 text-sm font-medium text-secondary-foreground transition-colors duration-fast ease-out hover:bg-(--secondary-hover) ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-fast ease-out hover:bg-(--secondary-hover) [&_svg]:size-3.5 ${focusRing}`,
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
