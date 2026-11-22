"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Firefly Toaster for sonner: raised white toasts with Carbon status icons.
 *
 * Sonner's own look is switched off and every part is styled here, so the
 * toast is the same floating panel as a menu: white, a 1rem corner, the
 * soft far shadow and no border. Only the status icon takes a colour. The
 * action is a near-black pill and cancel is a warm one, so neither competes
 * with the screen's one lit button.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="carbon:checkmark-filled" aria-hidden="true" />,
      info: <Icon icon="carbon:information" aria-hidden="true" />,
      warning: <Icon icon="carbon:warning-alt" aria-hidden="true" />,
      error: <Icon icon="carbon:error" aria-hidden="true" />,
      loading: (
        <Icon icon="carbon:circle-dash" className="animate-spin" aria-hidden="true" />
      ),
      close: <Icon icon="carbon:close" aria-hidden="true" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-(--width) items-start gap-3 rounded-xl bg-popover p-4 text-sm text-popover-foreground shadow-(--shadow-menu)",
        content: "flex min-w-0 flex-1 flex-col gap-0.5",
        title: "font-semibold leading-snug",
        description: "text-(--foreground-secondary)",
        icon: "mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-full bg-(--ink) px-3 text-sm font-medium text-(--ink-foreground) transition-colors duration-fast ease-out hover:bg-(--ink-hover) ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground transition-colors duration-fast ease-out hover:bg-(--surface-3) ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-full bg-popover text-muted-foreground shadow-(--shadow-card) transition-colors duration-fast ease-out hover:text-foreground [&_svg]:size-3.5 ${focusRing}`,
        success: "[&_[data-icon]]:text-(--success-text)",
        error: "[&_[data-icon]]:text-(--destructive-text)",
        warning: "[&_[data-icon]]:text-(--warning-text)",
        info: "[&_[data-icon]]:text-(--accent-line)",
      },
    }}
    {...props}
  />
);

export { Toaster };
