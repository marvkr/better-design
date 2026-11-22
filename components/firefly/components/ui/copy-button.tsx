"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string;
  copiedLabel?: string;
  label?: string;
}

const ICON_ONLY_SIZES = new Set(["icon", "icon-sm", "icon-lg"]);
const COPIED_MS = 2000;

/**
 * Firefly CopyButton: a quiet pill that copies a value.
 *
 * It is a ghost button by default, because copying is a helper and the glow
 * belongs to the one primary action. After a copy the icon turns into a
 * green checkmark for two seconds, and a screen reader hears the copied
 * label. Icon sizes show the icon alone; other sizes add the label.
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      copiedLabel = "Copied",
      label = "Copy",
      variant = "ghost",
      size = "icon",
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // The clipboard can refuse (no permission, insecure page). Leave the
        // button in its resting state so it never claims a copy that failed.
        return;
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    };

    const iconOnly = ICON_ONLY_SIZES.has(size ?? "icon");
    const currentLabel = copied ? copiedLabel : label;

    return (
      <>
        <Button
          ref={ref}
          data-slot="copy-button"
          data-copied={copied ? "" : undefined}
          variant={variant}
          size={size}
          aria-label={iconOnly ? currentLabel : undefined}
          className={cn(!iconOnly && "gap-1.5", className)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) void copy();
          }}
          {...props}
        >
          <Icon
            icon={copied ? "carbon:checkmark" : "carbon:copy"}
            className={cn("size-4", copied && "text-(--success-text)")}
            aria-hidden="true"
          />
          {!iconOnly && <span>{currentLabel}</span>}
        </Button>
        {/* Outside the button, so the button's own name is never doubled. */}
        <span className="sr-only" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
