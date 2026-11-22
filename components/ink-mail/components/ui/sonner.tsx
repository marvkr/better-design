"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

import { focusRing } from "./_shared";

/**
 * Ink mail Toaster for sonner: a floating panel on the elevated surface step.
 *
 * Sonner's own look is switched off and every part is styled here. The toast
 * is the same surface as a menu: the popover step, a 0.75rem corner and the
 * menu shadow token. Only the status icon takes a colour: green for
 * delivered, red for failed, yellow for queued, blue for information. The
 * action is the off-white primary fill; cancel is a quiet secondary block.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="ph:check-circle" aria-hidden="true" />,
      info: <Icon icon="ph:info" aria-hidden="true" />,
      warning: <Icon icon="ph:warning" aria-hidden="true" />,
      error: <Icon icon="ph:x-circle" aria-hidden="true" />,
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
        description: "text-muted-foreground",
        icon: "mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors duration-fast ease-out hover:bg-(--primary-hover) ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-xl border border-(--line-strong) bg-secondary px-3 text-sm font-semibold text-secondary-foreground transition-colors duration-fast ease-out hover:bg-muted ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-full border border-(--line-strong) bg-popover text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground [&_svg]:size-3.5 ${focusRing}`,
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
