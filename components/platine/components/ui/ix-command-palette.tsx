// CommandPalette: fuzzy-ranked command list with keyboard navigation, pointer-intent tracking, a live result count, and an optional modal overlay. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const BOUNDARY = /[\s\-_/.:]/;
const ROW = 36;
const GAP = 2;
const PAD = 5;

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  shortcut?: string[];
};

export type UseCommandPaletteOptions = {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss?: () => void;
};

function scoreOne(text: string, query: string): number {
  const t = text.toLowerCase();
  let cursor = 0;
  let total = 0;
  let streak = 0;

  for (let i = 0; i < query.length; i++) {
    const at = t.indexOf(query[i], cursor);
    if (at < 0) return -1;
    streak = at === cursor && i > 0 ? streak + 1 : 0;
    total += 2 + streak * 4;
    if (at === 0) total += 12;
    else if (BOUNDARY.test(t[at - 1])) total += 8;
    cursor = at + 1;
  }

  return total;
}

function rank(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const scored: { item: CommandItem; score: number; order: number }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const direct = scoreOne(item.label, q);
    const aliased = item.keywords ? scoreOne(item.keywords, q) - 3 : -1;
    const best = Math.max(direct, item.keywords ? aliased : -1);
    if (best < 0) continue;
    scored.push({ item, score: best - item.label.length * 0.05, order: i });
  }

  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.map((s) => s.item);
}

export function useCommandPalette({
  items,
  onSelect,
  onDismiss,
}: UseCommandPaletteOptions) {
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState<string | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const pointer = useRef({ x: -1, y: -1 });

  const select = useRef(onSelect);
  select.current = onSelect;
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  const results = useMemo(() => rank(items, query), [items, query]);

  const activeId = results.some((r) => r.id === pinned)
    ? pinned
    : (results[0]?.id ?? null);
  const activeIndex = results.findIndex((r) => r.id === activeId);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [query]);

  const reveal = (index: number) => {
    const list = listRef.current;
    const row = list?.children[index];
    if (!list || !(row instanceof HTMLElement)) return;
    const top = row.offsetTop - PAD;
    const bottom = row.offsetTop + row.offsetHeight + PAD;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  };

  const jump = (index: number) => {
    if (results.length === 0) return;
    const next = Math.max(0, Math.min(results.length - 1, index));
    setPinned(results[next].id);
    reveal(next);
  };

  const move = (delta: number) => {
    if (results.length === 0) return;
    const from = activeIndex < 0 ? 0 : activeIndex;
    jump((from + delta + results.length) % results.length);
  };

  const run = (item?: CommandItem) => {
    const target = item ?? results.find((r) => r.id === activeId);
    if (target) select.current(target);
  };

  const pointerActivate = (id: string, event: React.PointerEvent) => {
    const { x, y } = pointer.current;
    if (event.clientX === x && event.clientY === y) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (id !== activeId) setPinned(id);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      jump(0);
    } else if (event.key === "End") {
      event.preventDefault();
      jump(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run();
    } else if (event.key === "Escape") {
      event.preventDefault();
      dismiss.current?.();
    }
  };

  return {
    query,
    setQuery,
    results,
    activeId,
    activeIndex,
    listRef,
    onKeyDown,
    pointerActivate,
    jump,
    move,
    run,
  };
}

export type CommandPaletteProps = {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss?: () => void;

  open?: boolean;
  placeholder?: string;
  emptyLabel?: string;
  label?: string;
  maxRows?: number;
  autoFocus?: boolean;
  className?: string;
};

export function CommandPalette({
  items,
  onSelect,
  onDismiss,
  open,
  placeholder = "Search commands",
  emptyLabel = "No command matches",
  label = "Command palette",
  maxRows = 6,
  autoFocus = false,
  className = "",
}: CommandPaletteProps) {
  const uid = useId();
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  const {
    query,
    setQuery,
    results,
    activeId,
    listRef,
    onKeyDown,
    pointerActivate,
    run,
  } = useCommandPalette({ items, onSelect, onDismiss });

  const rows = Math.max(1, Math.min(maxRows, items.length));
  const height = PAD * 2 + rows * ROW + (rows - 1) * GAP;
  const count = results.length;

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open, setQuery]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!liveRef.current) return;
      liveRef.current.textContent =
        count === 0
          ? emptyLabel
          : `${count} ${count === 1 ? "command" : "commands"} available`;
    }, 400);
    return () => clearTimeout(id);
  }, [count, emptyLabel]);

  const spring = reduced ? { duration: 0 } : CELL;

  const overlaid = open !== undefined;

  const surface = (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card text-card-foreground ${
        overlaid ? "w-full max-w-[32.5rem] shadow-lg" : ""
      } ${className}`}
    >
      <div className="flex h-11 items-center gap-2.5 border-b border-border px-3">
        <svg
          viewBox="0 0 16 16"
          className="size-[0.875rem] shrink-0 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="7" cy="7" r="4.25" />
          <path d="M10.2 10.2 13.5 13.5" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={label}
          aria-expanded
          aria-controls={`${uid}-list`}
          aria-autocomplete="list"
          aria-activedescendant={activeId ? `${uid}-${activeId}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent text-[0.8438rem] text-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <span className="min-w-[3ch] shrink-0 text-right font-mono text-[0.5938rem] tabular-nums text-muted-foreground">
          {count}
        </span>
      </div>
      <div className="relative" style={{ height }}>
        <ul
          ref={listRef}
          id={`${uid}-list`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="listbox"
          aria-label={label}
          onMouseDown={(e) => e.preventDefault()}
          className="absolute inset-0 flex flex-col gap-[0.125rem] overflow-y-auto overscroll-contain p-[0.3125rem] [scrollbar-gutter:stable]"
        >
          {results.map((item) => {
            const active = item.id === activeId;
            return (
              /* eslint-disable-next-line jsx-a11y/interactive-supports-focus */
              <motion.li
                key={item.id}
                id={`${uid}-${item.id}`}
                role="option"
                aria-selected={active}
                layout={reduced ? false : "position"}
                transition={spring}
                onPointerMove={(e) => pointerActivate(item.id, e)}
                onClick={() => run(item)}
                className="relative flex h-9 shrink-0 cursor-default items-center rounded-md px-2.5"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={reduced ? { duration: 0 } : CROSSFADE}
                  className="absolute inset-0 rounded-md bg-muted"
                />
                <span className="relative flex min-w-0 flex-1 items-center gap-2.5">
                  <span className="truncate text-[0.8125rem] font-medium text-foreground">
                    {item.label}
                  </span>

                  {item.hint ? (
                    <span className="hidden shrink-0 text-[0.7188rem] text-muted-foreground sm:inline">
                      {item.hint}
                    </span>
                  ) : null}

                  {item.shortcut ? (
                    <span className="ml-auto flex shrink-0 items-center gap-1">
                      {item.shortcut.map((key) => (
                        <span
                          key={key}
                          className="flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-sm border border-border px-1 font-mono text-[0.5938rem] tabular-nums text-muted-foreground"
                        >
                          {key}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </span>
              </motion.li>
            );
          })}
        </ul>

        {count === 0 ? (
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : CROSSFADE}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center text-[0.7813rem] text-muted-foreground"
          >
            {emptyLabel}
          </motion.p>
        ) : null}
      </div>
      <span ref={liveRef} role="status" aria-live="polite" className="sr-only" />
    </div>
  );

  if (!overlaid) return surface;
  return <PaletteLayer open={open} onDismiss={onDismiss} reduced={Boolean(reduced)}>{surface}</PaletteLayer>;
}

const LAYER_EASE = [0.23, 1, 0.32, 1] as const;
const LAYER_OUT = [0.4, 0, 1, 1] as const;
const PANEL = { type: "spring", stiffness: 420, damping: 36, mass: 0.9 } as const;

function PaletteLayer({
  open,
  onDismiss,
  reduced,
  children,
}: {
  open: boolean;
  onDismiss?: () => void;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const leave = useRef(onDismiss);
  leave.current = onDismiss;

  useEffect(() => setHost(document.body), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      leave.current?.();
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    const padding = root.style.paddingRight;
    const gutter = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;
    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = padding;
    };
  }, [open]);

  if (!host) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette-layer"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="closed"
          animate="open"
          exit="gone"
          variants={{ closed: {}, open: {}, gone: {} }}
          onPointerDown={(event) => {
            if (event.target !== event.currentTarget) return;
            leave.current?.();
          }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/40"
            variants={{
              closed: { opacity: 0 },
              open: {
                opacity: 1,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: 0.2, ease: LAYER_EASE },
              },
              gone: {
                opacity: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: 0.15, ease: LAYER_OUT },
              },
            }}
          />
          <motion.div
            className="relative flex w-full justify-center"
            variants={{
              closed: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 },
              open: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { ...PANEL, opacity: { duration: 0.16, ease: LAYER_EASE } },
              },
              gone: reduced
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    scale: 0.98,
                    y: 6,
                    transition: { duration: 0.15, ease: LAYER_OUT },
                  },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}
