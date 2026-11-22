"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, optionTrack } from "./_shared";

/**
 * Mallow ColorSwatch: a chip of colour on a lilac option track with its name
 * and value under it. Hover gives the whole swatch the light violet tint
 * inside a violet ring, and a press copies the value.
 */
export interface ColorSwatchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string;
  name?: string;
  showValue?: boolean;
  onCopy?: () => void;
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, color, name, showValue = true, onCopy, ...props }, ref) => {
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
        await navigator.clipboard.writeText(color);
        setCopied(true);
        onCopy?.();
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      } catch {
        // Copy is best effort; the swatch stays as it was.
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={copy}
        data-slot="color-swatch"
        aria-label={`Copy color ${name ?? color}`}
        className={cn(
          "group flex flex-col items-start gap-3 rounded-xl p-2 text-left",
          "transition-[background-color,box-shadow] duration-base ease-(--ease-out)",
          "hover:bg-(--option-face) hover:shadow-(--option-edge)",
          pressScale,
          focusRing,
          className,
        )}
        {...props}
      >
        <span className={cn(optionTrack, "block rounded-md p-1 w-full")}>
          <span className="block h-14 w-full rounded-sm" style={{ backgroundColor: color }} />
        </span>
        <span className="flex w-full items-center justify-between gap-2 px-1 pb-1">
          <span className="min-w-0 flex-1">
            {name && <span className="block truncate text-sm font-medium text-foreground">{name}</span>}
            {showValue && (
              <span className="block truncate font-mono text-xs text-muted-foreground">{color}</span>
            )}
          </span>
          <Icon
            icon={copied ? "iconoir:check" : "iconoir:copy"}
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              copied && "text-foreground opacity-100",
            )}
          />
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </button>
    );
  },
);
ColorSwatch.displayName = "ColorSwatch";

export { ColorSwatch };
