"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { delay } from "motion";
import { WaitlistForm } from "./waitlist-form";
import { useGetWaitlistSpots } from "@/hooks/use-get-waitlist-spots";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

export function McpChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelDelayRef = useRef<(() => void) | null>(null);
  const cancelMessageDelayRef = useRef<(() => void) | null>(null);

  const { data: spotsData } = useGetWaitlistSpots();
  const spotsLeft = spotsData?.spotsLeft ?? 100;

  // Handle open with staggered entrance
  useEffect(() => {
    if (isOpen) {
      setShowMessage(true);
      cancelDelayRef.current = delay(() => setShowWaitlist(true), 1.8);
    }

    return () => cancelDelayRef.current?.();
  }, [isOpen]);

  // Handle close with reverse stagger (waitlist first, then message)
  const handleClose = () => {
    cancelDelayRef.current?.();
    setShowWaitlist(false);
    cancelMessageDelayRef.current = delay(() => {
      setShowMessage(false);
      setIsOpen(false);
    }, 0.3);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelDelayRef.current?.();
      cancelMessageDelayRef.current?.();
    };
  }, []);

  // Click outside to minimize
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="flex flex-col items-end gap-2 max-w-xs">
      {/* First message - clickable (received style, point bottom-left) */}
      <motion.button
        layout
        onClick={() => setIsOpen(true)}
        className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-left"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
      >
        Tired of teammates shipping UI that ignores your design system? 😡
      </motion.button>

      {/* Reply bubble - appears below first message */}
      <AnimatePresence mode="popLayout">
        {showMessage && (
          <motion.div
            layout
            className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 text-sm origin-top-right"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={springTransition}
          >
            Our MCP ensures every AI-generated component stays on brand.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waitlist form - appears below reply */}
      <AnimatePresence mode="popLayout">
        {showWaitlist && (
          <motion.div
            layout
            className="bg-card border border-border rounded-xl p-3 w-full space-y-2 origin-top-right"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={springTransition}
          >
            <p className="text-xs text-muted-foreground text-left">
              Get exclusive access to our MCP ({spotsLeft} spots left)
            </p>
            <WaitlistForm />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint - at the bottom */}
      <AnimatePresence>
        {!isOpen && (
          <motion.p
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            Tap to learn more
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
