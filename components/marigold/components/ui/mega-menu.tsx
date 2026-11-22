"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";
import { tbPopSurface } from "./_shared";

// Talentboard MegaMenu: nav bar with a sliding hover indicator and a wide
// columned panel on the shared pop surface.

interface MegaMenuColumn {
  title: string;
  items: string[];
}

interface MegaMenuItem {
  id: string;
  label: string;
  columns: MegaMenuColumn[];
}

interface MegaMenuProps {
  items: MegaMenuItem[];
  columnStagger?: number;
  indicatorTransition?: Transition;
  panelOffsetY?: number;
  panelEnterTransition?: Transition;
  panelExitTransition?: Transition;
  contentOffsetX?: number;
  contentTransition?: Transition;
  columnOffsetY?: number;
  columnTransition?: Transition;
}

export function MegaMenu({
  items,
  columnStagger = 0.04,
  indicatorTransition = { type: "spring", bounce: 0.2, duration: 0.4 },
  panelOffsetY = 8,
  panelEnterTransition = { duration: 0.18, ease: "easeOut" },
  panelExitTransition = { duration: 0.12, ease: "easeIn" },
  contentOffsetX = 12,
  contentTransition = { duration: 0.18, ease: "easeOut" },
  columnOffsetY = 6,
  columnTransition = { duration: 0.16, ease: "easeOut" },
}: MegaMenuProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState(0);
  const layoutId = React.useId();

  const activeItem = items.find((item) => item.id === activeId);

  const handleEnter = (id: string) => {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    const nextIndex = items.findIndex((item) => item.id === id);
    setDirection(currentIndex === -1 ? 0 : nextIndex > currentIndex ? 1 : -1);
    setActiveId(id);
  };

  return (
    <div className="relative" onMouseLeave={() => setActiveId(null)}>
      <nav
        aria-label="Mega menu"
        className="relative z-10 inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary p-1 shadow-[var(--tb-shadow-raise)]"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              aria-expanded={isActive}
              onMouseEnter={() => handleEnter(item.id)}
              onFocus={() => handleEnter(item.id)}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${layoutId}-indicator`}
                  className="absolute inset-0 rounded-md bg-accent"
                  transition={indicatorTransition}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: panelOffsetY }}
            animate={{ opacity: 1, y: 0, transition: panelEnterTransition }}
            exit={{ opacity: 0, y: panelOffsetY / 2, transition: panelExitTransition }}
            className={cn(tbPopSurface, "absolute left-0 top-full z-20 mt-2 min-w-[28rem] rounded-xl p-5")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: direction * contentOffsetX }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -contentOffsetX }}
                transition={contentTransition}
                className="grid grid-cols-2 gap-6"
              >
                {activeItem.columns.map((column, columnIndex) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, y: columnOffsetY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...columnTransition, delay: columnIndex * columnStagger }}
                  >
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {column.title}
                    </div>
                    <ul className="space-y-1">
                      {column.items.map((entry) => (
                        <li key={entry}>
                          <button
                            type="button"
                            className="w-full rounded-md px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-accent"
                          >
                            {entry}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
