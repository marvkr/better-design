// LogoMarquee: infinite logo strip with rAF drift, hold-to-pause, focus reveal, and reduced-motion scroll fallback. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect, useReducedMotion } from "motion/react";

const RAMP = 0.19;
const SETTLE = 0.16;
const MAX_COPIES = 14;

export type MarqueeDirection = "left" | "right";

export type UseLogoMarqueeOptions = {
  speed?: number;
  direction?: MarqueeDirection;
  gap?: number;
  paused?: boolean;
};

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

export function useLogoMarquee({
  speed = 44,
  direction = "left",
  gap = 40,
  paused = false,
}: UseLogoMarqueeOptions = {}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [copies, setCopies] = useState(4);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState(false);

  const reduced = useReducedMotion() === true;
  const stopped = held || paused;

  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const movingRef = useRef(false);
  movingRef.current = !stopped && !reduced;

  const offset = useRef(0);
  const nudge = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = reducedRef.current ? 0 : offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();

      const next =
        reduced || loop <= 0
          ? 4
          : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint, reduced]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (!("IntersectionObserver" in globalThis)) {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setNear(entry.isIntersecting);
      },
      { rootMargin: "96px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return;

    let frame = 0;
    let last = 0;
    const sign = direction === "right" ? 1 : -1;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const loop = span.current;
      if (loop <= 0) return;

      rate.current +=
        ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));

      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE));
      nudge.current -= pull;

      let x = offset.current + sign * speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) {
        nudge.current = 0;
        x = fold(x, loop);
      } else {
        x = clamp(x, -loop, loop);
      }

      offset.current = x;
      paint();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, direction, paint]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const pin = () => {
      if (reducedRef.current) return;
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
      if (viewport.scrollTop !== 0) viewport.scrollTop = 0;
    };

    viewport.addEventListener("scroll", pin, { passive: true });
    return () => viewport.removeEventListener("scroll", pin);
  }, []);

  useEffect(() => {
    const release = () => setHeld(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, []);

  const reveal = useCallback((node: HTMLElement) => {
    const viewport = viewportRef.current;
    const loop = span.current;
    if (!viewport || reducedRef.current || loop <= 0) return;
    if (node === viewport) return;

    const view = viewport.getBoundingClientRect();
    const box = node.getBoundingClientRect();
    const pad = 12;

    let delta = 0;
    if (box.left < view.left + pad) delta = view.left + pad - box.left;
    else if (box.right > view.right - pad) delta = view.right - pad - box.right;
    if (delta === 0) return;

    const target = clamp(offset.current + nudge.current + delta, -loop, loop);
    nudge.current = target - offset.current;
  }, []);

  const bind = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") setHeld(true);
    },
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: React.PointerEvent) => {
      if (e.pointerType === "touch") setHeld(false);
    },
    onPointerCancel: () => setHeld(false),
    onPointerLeave: () => setHeld(false),
    onFocus: (e: React.FocusEvent) => {
      setHeld(true);
      if (e.target instanceof HTMLElement) reveal(e.target);
    },
    onBlur: () => setHeld(false),
  };

  return {
    viewportRef,
    trackRef,
    groupRef,
    copies,
    paused: stopped,
    reduced,
    bind,
  };
}

export type LogoMarqueeItem = {
  id: string;
  label: string;
  href?: string;
  mark?: React.ReactNode;
};

export type LogoMarqueeProps = {
  items: LogoMarqueeItem[];
  label?: string;
  speed?: number;
  direction?: MarqueeDirection;
  gap?: number;
  paused?: boolean;
  onSelect?: (item: LogoMarqueeItem) => void;
  className?: string;
};

const FACE =
  "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted-foreground";

const HIT =
  "outline-none transition-colors duration-fast hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-offset-0";

function face(item: LogoMarqueeItem) {
  if (!item.mark) return item.label;
  return (
    <>
      <span aria-hidden>{item.mark}</span>
      <span className="sr-only">{item.label}</span>
    </>
  );
}

export function LogoMarquee({
  items,
  label = "Logos",
  speed = 44,
  direction = "left",
  gap = 40,
  paused = false,
  onSelect,
  className = "",
}: LogoMarqueeProps) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } =
    useLogoMarquee({ speed, direction, gap, paused });

  const groups = reduced ? 1 : copies;
  const live = reduced ? 0 : 1;

  return (
    <section
      aria-label={label}
      className={`relative isolate w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm ${className}`}
      {...bind}
    >
      <div
        ref={viewportRef}

        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={reduced ? 0 : undefined}
        style={{ overflowX: reduced ? "auto" : "hidden" }}
        className="overflow-y-hidden py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-offset-0"
      >
        <div
          ref={trackRef}
          style={{ gap, willChange: "transform" }}
          className="flex w-max items-center"
        >
          {Array.from({ length: groups }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === live ? groupRef : undefined}
              aria-hidden={copy === live ? undefined : true}
              style={{ gap }}
              className="flex w-max items-center"
            >
              {items.map((item) => (
                <li key={item.id} className="shrink-0">
                  {copy !== live ? (
                    <span className={FACE}>{item.mark ?? item.label}</span>
                  ) : item.href ? (
                    <a href={item.href} className={`${FACE} ${HIT}`}>
                      {face(item)}
                    </a>
                  ) : onSelect ? (
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      className={`${FACE} ${HIT}`}
                    >
                      {face(item)}
                    </button>
                  ) : (
                    <span className={FACE}>{face(item)}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-card to-card/0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-card to-card/0"
      />
    </section>
  );
}
