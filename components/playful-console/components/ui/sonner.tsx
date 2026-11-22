"use client";

import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner";
import { Icon } from "@iconify/react";

import { pressOutline, pressPrimary } from "./_shared";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring";

/**
 * Playful console Toaster for sonner: white cards with duotone status icons.
 *
 * Sonner's own look is switched off and every part is styled here, so the
 * toast is the same panel as a menu: white, the olive hairline, the card
 * corner and a soft drop. The status icon takes the bold highlight colour
 * for its tone. The action is a small orange key and cancel a white key,
 * so both press like every other button.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerPrimitive
    icons={{
      success: <Icon icon="ph:check-circle-duotone" aria-hidden="true" />,
      info: <Icon icon="ph:info-duotone" aria-hidden="true" />,
      warning: <Icon icon="ph:warning-duotone" aria-hidden="true" />,
      error: <Icon icon="ph:warning-circle-duotone" aria-hidden="true" />,
      loading: (
        <Icon icon="ph:circle-notch-bold" className="animate-spin" aria-hidden="true" />
      ),
      close: <Icon icon="ph:x-bold" aria-hidden="true" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-(--width) items-start gap-3 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-(--shadow-menu)",
        content: "flex min-w-0 flex-1 flex-col gap-0.5",
        title: "font-bold leading-snug",
        description: "text-(--foreground-secondary)",
        icon: "mt-0.5 flex size-4.5 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4.5",
        actionButton: `inline-flex h-8 shrink-0 items-center rounded-[0.5rem] px-3 text-[0.8125rem] font-bold ${pressPrimary} ${focusRing}`,
        cancelButton: `inline-flex h-8 shrink-0 items-center rounded-[0.5rem] px-3 text-[0.8125rem] font-bold ${pressOutline} ${focusRing}`,
        closeButton: `absolute -end-2 -top-2 inline-flex size-6 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground [&_svg]:size-3 ${focusRing}`,
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
