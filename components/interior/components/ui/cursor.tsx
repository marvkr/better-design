"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/*
 * Interior Cursor — progressive typing behind an accent caret. A live caret
 * is the system responding, which is exactly what accent is for. The blink
 * is a hard square wave — on, on, off, off — because a terminal caret snaps;
 * a caret that fades is pretending to be a spotlight. The bar is a hard
 * rectangle: nothing here is a pill.
 */

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
}

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  (
    { className, text, speed = 60, loop = false, pauseMs = 1500, ...props },
    ref,
  ) => {
    const [display, setDisplay] = React.useState("");
    const [phase, setPhase] = React.useState<"typing" | "paused" | "deleting">(
      "typing",
    );

    // A new text prop restarts the animation; without this the old string
    // keeps typing out and the new one never appears.
    React.useEffect(() => {
      setDisplay("");
      setPhase("typing");
    }, [text]);

    React.useEffect(() => {
      if (phase === "typing") {
        if (display.length < text.length) {
          const timer = setTimeout(
            () => setDisplay(text.slice(0, display.length + 1)),
            speed,
          );
          return () => clearTimeout(timer);
        }
        if (loop) {
          const timer = setTimeout(() => setPhase("deleting"), pauseMs);
          return () => clearTimeout(timer);
        }
        setPhase("paused");
      } else if (phase === "deleting") {
        if (display.length > 0) {
          const timer = setTimeout(
            () => setDisplay(text.slice(0, display.length - 1)),
            speed / 2,
          );
          return () => clearTimeout(timer);
        }
        setPhase("typing");
      }
    }, [display, phase, text, speed, loop, pauseMs]);

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-baseline font-mono", className)}
        aria-label={text}
        {...props}
      >
        <span>{display}</span>
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1.06,
            times: [0, 0.5, 0.5, 1],
            repeat: Infinity,
            ease: "linear",
          }}
          className="ml-0.5 inline-block h-[1em] w-[0.125rem] translate-y-[0.125rem] bg-ring"
        />
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
