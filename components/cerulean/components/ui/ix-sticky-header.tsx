// StickyHeader: scroll-condensing header that shrinks a large title into a compact bar as its region scrolls. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const SMOOTH = { stiffness: 240, damping: 44, mass: 0.6 } as const;

export type UseCondenseOptions = {
  range?: number;
};

export type UseCondenseResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  progress: MotionValue<number>;
  condensed: boolean;
};

export function useCondense<T extends HTMLElement = HTMLDivElement>({
  range = 48,
}: UseCondenseOptions = {}): UseCondenseResult<T> {
  const ref = useRef<T | null>(null);
  const { scrollY } = useScroll({ container: ref });

  const progress = useTransform(scrollY, [0, Math.max(1, range)], [0, 1], {
    clamp: true,
  });

  const [condensed, setCondensed] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    const done = p >= 1;
    setCondensed((prev) => (prev === done ? prev : done));
  });

  return { ref, progress, condensed };
}

export type StickyHeaderProps = {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  expandedHeight?: number;
  compactHeight?: number;
  maxHeight?: number;
  className?: string;
};

export function StickyHeader({
  title,
  children,
  subtitle,
  leading,
  actions,
  expandedHeight = 68,
  compactHeight = 48,
  maxHeight = 320,
  className = "",
}: StickyHeaderProps) {
  const tall = Math.max(expandedHeight, compactHeight);
  const short = Math.min(expandedHeight, compactHeight);
  const travel = Math.max(1, tall - short);

  const { ref, progress: tracked, condensed } = useCondense<HTMLDivElement>({
    range: Math.max(64, travel * 3),
  });
  const reduced = useReducedMotion();
  const sprung = useSpring(tracked, SMOOTH);
  const progress = reduced ? tracked : sprung;

  const plate = useTransform(progress, (p) => (tall - travel * p) / tall);
  const edge = useTransform(progress, (p) => tall - travel * p);
  const lifted = useTransform(progress, [0, 0.12], [0, 1], { clamp: true });

  const bigY = useTransform(progress, (p) => -travel * p);
  const bigOpacity = useTransform(progress, [0, 0.45], [1, 0], { clamp: true });
  const bigScale = useTransform(progress, (p) => 1 - 0.05 * p);

  const smallOpacity = useTransform(progress, [0.55, 0.9], [0, 1], {
    clamp: true,
  });
  const smallY = useTransform(smallOpacity, (o) => (1 - o) * 6);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm ${className}`}
    >
      <div
        ref={ref}

        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        role="region"
        aria-label={title}
        style={{ maxHeight, scrollPaddingTop: short + 10 }}
        className="overflow-y-auto overscroll-y-contain outline-none [scrollbar-gutter:stable] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div aria-hidden style={{ height: tall }} />
        {children}

        <div
          aria-hidden
          className="pointer-events-none sticky bottom-0 -mt-6 h-6 bg-gradient-to-t from-card to-transparent"
        />
      </div>
      <header
        data-condensed={condensed ? "true" : "false"}
        style={{ height: tall }}
        className="pointer-events-none absolute inset-x-0 top-0"
      >
        <motion.div
          aria-hidden
          style={{ height: tall, scaleY: plate }}
          className="absolute inset-x-0 top-0 origin-top bg-card"
        />
        <motion.div
          aria-hidden
          style={{ y: edge, opacity: lifted }}
          className="absolute inset-x-0 top-0 h-px shadow-md"
        />
        <motion.div
          aria-hidden
          style={{ y: edge, opacity: lifted }}
          className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-card to-transparent"
        />
        <motion.div
          aria-hidden
          style={{ y: edge, opacity: lifted }}
          className="absolute inset-x-0 top-0 h-px bg-border"
        />
        <div className="absolute inset-x-0 top-0 flex items-start gap-2.5 px-4 pt-3">
          {leading ? (
            <div className="pointer-events-auto flex h-6 shrink-0 items-center">
              {leading}
            </div>
          ) : null}

          <div className="relative min-w-0 flex-1">
            <motion.div
              style={{
                y: bigY,
                opacity: bigOpacity,
                scale: bigScale,
                transformOrigin: "left top",
              }}
            >
              <h2 className="truncate text-[1.25rem] font-medium leading-[1.2] tracking-[-0.03em] text-foreground">
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-0.5 truncate text-[0.7188rem] leading-[1.35] text-muted-foreground">
                  {subtitle}
                </p>
              ) : null}
            </motion.div>
            <motion.span
              aria-hidden
              style={{ opacity: smallOpacity, y: smallY }}
              className="absolute inset-x-0 top-[0.1875rem] truncate text-[0.8125rem] font-medium leading-[1.4] text-foreground"
            >
              {title}
            </motion.span>
          </div>

          {actions ? (
            <div className="pointer-events-auto flex h-6 shrink-0 items-center gap-1.5">
              {actions}
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}
