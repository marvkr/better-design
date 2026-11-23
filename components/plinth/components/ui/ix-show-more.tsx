// ShowMore: clamps content to a line count and springs it open with a fade veil, scroll cap, and Show more/less toggle. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  motion,
  useIsomorphicLayoutEffect,
  useReducedMotion,
} from "motion/react";

const DISCLOSE = {
  type: "spring",
  stiffness: 190,
  damping: 30,
  mass: 1,
} as const;

const SMALL = {
  type: "spring",
  stiffness: 700,
  damping: 46,
  mass: 0.5,
} as const;

const INSTANT = { duration: 0 } as const;

// Opaque above the last 2.25rem, then down to --veil-clear at the bottom edge: 0 hides the last line, 1 shows it.
const VEIL_MASK =
  "linear-gradient(to top, oklch(0 0 0 / var(--veil-clear, 0)), oklch(0 0 0) 2.25rem)";

type Metrics = { line: number; full: number };

export type UseShowMoreOptions = {
  lines?: number;
  maxHeight?: number;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export type UseShowMoreResult = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  expanded: boolean;
  open: boolean;
  toggle: () => void;
  setExpanded: (next: boolean) => void;
  height: number | null;
  collapsedHeight: number | null;
  fullHeight: number | null;
  expandable: boolean;
  capped: boolean;
  scrollable: boolean;
};

export function useShowMore({
  lines = 3,
  maxHeight = 320,
  defaultExpanded = false,
  expanded: expandedProp,
  onExpandedChange,
}: UseShowMoreOptions = {}): UseShowMoreResult {
  const [uncontrolled, setUncontrolled] = useState(defaultExpanded);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const expanded = expandedProp ?? uncontrolled;

  const notify = useRef(onExpandedChange);
  notify.current = onExpandedChange;

  const setExpanded = useCallback(
    (next: boolean) => {
      if (expandedProp === undefined) setUncontrolled(next);
      notify.current?.(next);
    },
    [expandedProp],
  );

  const toggle = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded],
  );

  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const read = () => {
      const styles = getComputedStyle(el);
      const parsed = Number.parseFloat(styles.lineHeight);
      const line = Number.isFinite(parsed)
        ? parsed
        : Number.parseFloat(styles.fontSize) * 1.5;
      const full = el.scrollHeight;

      setMetrics((prev) =>
        prev && prev.line === line && prev.full === full
          ? prev
          : { line, full },
      );
    };

    read();

    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clamped = metrics ? metrics.line * lines : 0;
  const expandable = metrics ? metrics.full - clamped > 1 : true;
  const capped = metrics ? metrics.full > maxHeight : false;
  const collapsedHeight = metrics ? Math.min(clamped, metrics.full) : null;
  const fullHeight = metrics ? Math.min(metrics.full, maxHeight) : null;
  const open = expanded && expandable;

  return {
    contentRef,
    expanded,
    open,
    toggle,
    setExpanded,
    height: open ? fullHeight : collapsedHeight,
    collapsedHeight,
    fullHeight,
    expandable,
    capped,
    scrollable: open && capped,
  };
}

export type ShowMoreProps = UseShowMoreOptions & {
  children: React.ReactNode;
  moreLabel?: string;
  lessLabel?: string;
  label?: string;
  className?: string;
};

export function ShowMore({
  children,
  moreLabel = "Show more",
  lessLabel = "Show less",
  label = "Details",
  lines = 3,
  maxHeight = 320,
  defaultExpanded,
  expanded,
  onExpandedChange,
  className = "",
}: ShowMoreProps) {
  const reduced = useReducedMotion();
  const regionId = useId();
  const regionRef = useRef<HTMLDivElement>(null);

  const { contentRef, open, toggle, height, expandable, capped, scrollable } =
    useShowMore({
      lines,
      maxHeight,
      defaultExpanded,
      expanded,
      onExpandedChange,
    });

  const press = () => {
    if (open) regionRef.current?.scrollTo({ top: 0 });
    toggle();
  };

  const veiled = expandable && (!open || scrollable);

  return (
    <div
      className={`text-[0.8438rem] leading-relaxed text-foreground ${className}`}
    >
      <motion.div
        ref={regionRef}
        id={regionId}
        role={scrollable ? "region" : undefined}
        aria-label={scrollable ? label : undefined}
        tabIndex={scrollable ? 0 : undefined}
        initial={false}
        // The last lines fade out through a mask, so the fade works on any surface, a translucent one too.
        animate={
          height === null
            ? { "--veil-clear": veiled ? 0 : 1 }
            : { height, "--veil-clear": veiled ? 0 : 1 }
        }
        transition={reduced ? INSTANT : { ...DISCLOSE, "--veil-clear": SMALL }}
        style={{
          maskImage: VEIL_MASK,
          maxHeight: height === null ? `${lines}lh` : undefined,
          overflowY: scrollable ? "auto" : "hidden",

          scrollbarGutter: capped ? "stable" : undefined,
        }}
        className="overflow-hidden overscroll-contain rounded-md outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div ref={contentRef}>{children}</div>
      </motion.div>
      <div className="mt-2 flex h-8 items-center">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          onClick={press}
          aria-expanded={open}
          aria-controls={regionId}
          className={`inline-flex h-8 select-none items-center gap-2 rounded-md border border-border bg-card px-2.5 text-[0.7813rem] font-medium text-foreground outline-none transition-[border-color,box-shadow] duration-fast hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 ${
            expandable ? "" : "pointer-events-none invisible"
          }`}
        >
          <span className="grid text-left">
            <motion.span
              aria-hidden={open}
              className="col-start-1 row-start-1"
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={reduced ? INSTANT : SMALL}
            >
              {moreLabel}
            </motion.span>
            <motion.span
              aria-hidden={!open}
              className="col-start-1 row-start-1"
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={reduced ? INSTANT : SMALL}
            >
              {lessLabel}
            </motion.span>
          </span>
          <motion.svg
            aria-hidden
            width="12"
            height="12"
            viewBox="0 0 256 256"
            fill="none"
            className="text-muted-foreground"
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduced ? INSTANT : SMALL}
          >
            <polyline
              points="208 96 128 176 48 96"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}
