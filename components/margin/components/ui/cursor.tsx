"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Margin Cursor: text that types itself out behind a blinking caret, the
 * way a line appears in a note. The caret is a thin bar of the primary oxblood
 * that blinks on and off without a fade.
 */
export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
}

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  ({ className, text, speed = 60, loop = false, pauseMs = 1500, ...props }, ref) => {
    const [display, setDisplay] = React.useState("");
    const [phase, setPhase] = React.useState<"typing" | "paused" | "deleting">("typing");

    React.useEffect(() => {
      if (phase === "typing") {
        if (display.length < text.length) {
          const t = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed);
          return () => clearTimeout(t);
        }
        if (loop) {
          const t = setTimeout(() => setPhase("deleting"), pauseMs);
          return () => clearTimeout(t);
        }
        setPhase("paused");
      } else if (phase === "deleting") {
        if (display.length > 0) {
          const t = setTimeout(() => setDisplay(text.slice(0, display.length - 1)), speed / 2);
          return () => clearTimeout(t);
        }
        setPhase("typing");
      }
    }, [display, phase, text, speed, loop, pauseMs]);

    return (
      <span
        ref={ref}
        data-slot="cursor"
        aria-label={text}
        className={cn("inline-flex items-center text-foreground", className)}
        {...props}
      >
        <span aria-hidden className="whitespace-pre">{display}</span>
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.05, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
          className="ml-0.5 inline-block h-4 w-0.5 rounded-full bg-primary"
        />
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
