"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
  /** Name shown in a black chip beside a pointer, like a collaborator's cursor. */
  label?: string;
  /** Fill for the pointer arrow; the caret and the chip stay black. */
  color?: string;
  /** Wait before the first letter, in milliseconds. */
  delay?: number;
}

/**
 * Bold retail Cursor: text that types itself out behind a black caret, the
 * way a search field fills with "Running shoes". The caret is a thin square
 * black bar that blinks on and off. Give it a label and a small black
 * pointer appears under the text with the name in a black pill. With reduced
 * motion on, the full text shows at once and the caret holds still.
 */
const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  (
    {
      className,
      text,
      speed = 60,
      loop = false,
      pauseMs = 1500,
      label,
      color,
      delay = 0,
      ...props
    },
    ref,
  ) => {
    const [display, setDisplay] = React.useState("");
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
      if (reduceMotion) {
        setDisplay(text);
        return;
      }

      let timer: ReturnType<typeof setTimeout>;
      let shown = 0;
      let deleting = false;
      setDisplay("");

      const tick = () => {
        if (!deleting) {
          if (shown < text.length) {
            shown += 1;
            setDisplay(text.slice(0, shown));
            timer = setTimeout(tick, speed);
            return;
          }
          if (!loop) return;
          deleting = true;
          timer = setTimeout(tick, pauseMs);
          return;
        }
        if (shown > 0) {
          shown -= 1;
          setDisplay(text.slice(0, shown));
          timer = setTimeout(tick, speed / 2);
          return;
        }
        deleting = false;
        timer = setTimeout(tick, speed * 4);
      };

      timer = setTimeout(tick, delay);
      return () => clearTimeout(timer);
    }, [text, speed, loop, pauseMs, delay, reduceMotion]);

    return (
      <span
        ref={ref}
        data-slot="cursor"
        className={cn("inline-flex flex-col items-start gap-1", className)}
        {...props}
      >
        <span className="sr-only">{text}</span>
        <span
          aria-hidden="true"
          className="inline-flex min-h-6 items-baseline text-base text-foreground"
        >
          <span className="whitespace-pre-wrap">{display}</span>
          <motion.span
            animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }
            }
            className="ms-0.5 inline-block h-5 w-0.5 translate-y-1 bg-primary"
          />
        </span>
        {label && (
          <span aria-hidden="true" className="inline-flex items-start">
            <svg
              viewBox="0 0 16 16"
              className={cn(
                "size-4 shrink-0 fill-primary stroke-background",
                color && "stroke-primary",
              )}
              style={color ? { fill: color } : undefined}
              /* A light custom fill needs a firmer black edge to read on white. */
              strokeWidth={color ? 1.75 : 1.25}
              strokeLinejoin="round"
            >
              <path d="M2.5 1.5 13 8.2 8.3 9.1 5.9 13.6Z" />
            </svg>
            <span className="mt-3 whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              {label}
            </span>
          </span>
        )}
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
