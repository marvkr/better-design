"use client"

import { AnimatePresence, motion, type Transition, type Variants } from "motion/react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { popoverSurface } from "./_shared"

// Amber Glass MegaMenu: glass nav strip opening a floating glass panel.

/** ==============   Types   ================ */

interface MegaMenuColumn {
  title: string
  items: string[]
}

interface MegaMenuItem {
  id: string
  label: string
  columns: MegaMenuColumn[]
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  columnStagger?: number
  indicatorTransition?: Transition
  panelOffsetY?: number
  panelEnterTransition?: Transition
  panelExitTransition?: Transition
  contentOffsetX?: number
  contentTransition?: Transition
  columnOffsetY?: number
  columnTransition?: Transition
}

/** ==============   Component   ================ */

export function MegaMenu({
  items,
  columnStagger = 0.04,
  indicatorTransition = { type: "spring", stiffness: 500, damping: 35 },
  panelOffsetY = -8,
  panelEnterTransition = { type: "spring", stiffness: 500, damping: 35 },
  panelExitTransition = { duration: 0.15, ease: "easeOut" },
  contentOffsetX = 40,
  contentTransition = { type: "spring", stiffness: 300, damping: 30 },
  columnOffsetY = 8,
  columnTransition = { type: "spring", stiffness: 400, damping: 30 },
}: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  const contentVariants: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d * contentOffsetX }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -contentOffsetX }),
  }

  const active = items.find((item) => item.id === activeMenu)

  const handleHover = (id: string) => {
    const currentIndex = items.findIndex((item) => item.id === activeMenu)
    const nextIndex = items.findIndex((item) => item.id === id)
    setDirection(nextIndex > currentIndex ? 1 : -1)
    setActiveMenu(id)
  }

  return (
    <div className="relative" onMouseLeave={() => setActiveMenu(null)}>
      <nav
        className={cn(
          "relative z-10 flex items-center gap-1 rounded-lg p-1",
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)]",
          "border border-[color:var(--ag-border)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]"
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onMouseEnter={() => handleHover(item.id)}
            onFocus={() => handleHover(item.id)}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-sm font-semibold transition-colors duration-fast",
              activeMenu === item.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeMenu === item.id && (
              <motion.span
                layoutId="mega-menu-indicator"
                className="absolute inset-0 rounded-md bg-[var(--ag-fill-hover)] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.08)]"
                transition={indicatorTransition}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: panelOffsetY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: panelOffsetY }}
            transition={
              activeMenu ? panelEnterTransition : panelExitTransition
            }
            className={cn(
              "absolute left-0 top-full z-50 mt-2 w-max min-w-full overflow-hidden rounded-xl p-5",
              popoverSurface
            )}
          >
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={contentTransition}
                className="flex gap-8"
              >
                {active.columns.map((column, columnIndex) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, y: columnOffsetY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...columnTransition,
                      delay: columnIndex * columnStagger,
                    }}
                    className="flex min-w-[8.75rem] flex-col gap-2"
                  >
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {column.title}
                    </span>
                    <ul className="flex flex-col gap-1">
                      {column.items.map((entry) => (
                        <li key={entry}>
                          <button
                            type="button"
                            className="w-full rounded-md px-2 py-1 text-left text-sm text-foreground/85 transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground"
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
  )
}
