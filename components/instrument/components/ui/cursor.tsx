"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Gauge Dark Cursor: a floating readout chip.
// Rendered at the floating layer, so it carries the deepest shadow in the
// nested hierarchy (--shadow-pop) and a gold caret, like a live gauge needle.

interface CursorProps {
  text: string;
  label?: string;
  color?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

function Cursor({
  text,
  label,
  color = "var(--primary)",
  speed = 60,
  delay = 500,
  loop = false,
  className,
}: CursorProps) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayedText("");
      charIndex = 0;

      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeChar, speed + Math.random() * 40);
        } else {
          setIsTyping(false);
          if (loop) {
            timeout = setTimeout(() => {
              setDisplayedText("");
              timeout = setTimeout(startTyping, delay);
            }, 2000);
          }
        }
      };

      timeout = setTimeout(typeChar, 100);
    };

    timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop]);

  return (
    <div className={cn("relative inline-flex flex-col gap-2", className)}>
      <AnimatePresence>
        {(isTyping || displayedText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-border bg-popover px-3 py-2 font-mono text-sm text-foreground shadow-[var(--shadow-pop)]"
            style={{ minHeight: "36px" }}
          >
            <span>{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="ml-px inline-block h-3.5 w-0.5 align-middle"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {label && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1.5"
        >
          <div
            className="h-2.5 w-2.5 rounded-full shadow-[var(--shadow-raised)]"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </motion.div>
      )}
    </div>
  );
}

export { Cursor };
export type { CursorProps };
