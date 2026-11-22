"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

const focusRing = "outline-none focus-visible:ring-3 focus-visible:ring-ring";

/**
 * Airy docs Toaster for sonner: white notes with Feather status icons.
 *
 * Sonner's own look is switched off and each part is styled here, so a toast
 * is the same floating panel as a menu: white, a 0.75rem corner and a
 * hairline ring and no shadow. Only the status icon takes a colour:
 * green for success, blue for info, amber for warning, red for error. The
 * action is the green pill and cancel a hairline outline pill.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="feather:check-circle" aria-hidden="true" />,
      info: <Icon icon="feather:info" aria-hidden="true" />,
      warning: <Icon icon="feather:alert-triangle" aria-hidden="true" />,
      error: <Icon icon="feather:alert-circle" aria-hidden="true" />,
      loading: (
        <Icon icon="feather:loader" className="animate-spin" aria-hidden="true" />
      ),
      close: <Icon icon="feather:x" aria-hidden="true" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-(--width) items-start gap-3 rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-(--shadow-menu)",
        content: "flex min-w-0 flex-1 flex-col gap-1",
        title: "font-semibold text-foreground",
        description: "text-(--foreground-secondary)",
        icon: "mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors duration-fast hover:bg-(--primary-hover) ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-full border border-(--line-strong) bg-background px-3 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-secondary ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground transition-colors duration-fast hover:text-foreground [&_svg]:size-3 ${focusRing}`,
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
