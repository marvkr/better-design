"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, surfacePlate } from "./_shared";

/**
 * Burnished ColorSwatch: a plate holding a chip of colour set into a well,
 * so the colour reads as an inlay rather than a sticker. The plate lifts to
 * the graphite face under a fine pointer, and a press copies the value.
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
          "group flex flex-col items-start gap-2.5 rounded-xl p-2.5 text-left",
          surfacePlate,
          "transition-[background-image,box-shadow] duration-base ease-(--ease-out)",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-(image:--fill-raised) [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-(--bevel-raised-hover)",
          pressScale,
          focusRing,
          className,
        )}
        {...props}
      >
        <div className="h-14 w-full rounded-md shadow-(--bevel-well)" style={{ backgroundColor: color }} />
        <div className="flex w-full items-center justify-between gap-2 px-0.5">
          <div className="min-w-0 flex-1">
            {name && <div className="truncate text-xs font-semibold text-foreground">{name}</div>}
            {showValue && (
              <div className="truncate font-mono text-[0.6875rem] text-muted-foreground">{color}</div>
            )}
          </div>
          <Icon
            icon={copied ? "ph:check-bold" : "ph:copy"}
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast",
              "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-visible:opacity-100",
              copied && "text-primary-text opacity-100",
            )}
          />
        </div>
      </button>
    );
  },
);
ColorSwatch.displayName = "ColorSwatch";

export { ColorSwatch };
