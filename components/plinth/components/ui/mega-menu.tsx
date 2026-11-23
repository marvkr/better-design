"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Plinth MegaMenu: a toolbar of menu names inside a recessed track. The
 * open name lifts as a raised segment; its panel drops below as a floating
 * inspector with one column per group.
 */

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
  className?: string
}

export function MegaMenu({ items, className }: MegaMenuProps) {
  const [open, setOpen] = React.useState<string | null>(null)
  const reduce = useReducedMotion()
  const panelId = React.useId()
  const active = items.find((item) => item.id === open)

  return (
    <div
      data-slot="mega-menu"
      className={cn("relative w-full", className)}
      onMouseLeave={() => setOpen(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(null)
      }}
    >
      <nav
        aria-label="Main"
        className="flex gap-1 rounded-xl bg-input p-1 [box-shadow:var(--shadow-inset)]"
      >
        {items.map((item) => {
          const isOpen = open === item.id
          return (
            <button
              key={item.id}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? panelId : undefined}
              onMouseEnter={() => setOpen(item.id)}
              onFocus={() => setOpen(item.id)}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className={cn(
                "relative flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium",
                "transition-colors duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isOpen && (
                <motion.span
                  layoutId="plinth-mega-menu-segment"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg [background:var(--segment-gradient)] [box-shadow:var(--shadow-segment)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 40 }}
                />
              )}
              <span className="relative">{item.label}</span>
              <ChevronDownIcon
                className={cn(
                  "relative size-3.5 transition-transform duration-base",
                  isOpen && "rotate-180"
                )}
              />
            </button>
          )
        })}
      </nav>

      <AnimatePresence>
        {active && (
          <motion.div
            key="panel"
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl bg-popover p-3 text-popover-foreground [box-shadow:var(--shadow-l)]"
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-2">
              {active.columns.map((column) => (
                <div key={column.title} className="flex flex-col gap-0.5">
                  <div className="px-2.5 pb-1.5 pt-1 font-mono text-[0.6875rem] uppercase text-muted-foreground">
                    {column.title}
                  </div>
                  {column.items.map((link) => (
                    <a
                      key={link}
                      href="#"
                      onClick={(event) => event.preventDefault()}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-sm text-foreground",
                        "transition-colors duration-fast hover:bg-muted",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// feather:chevron-down
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
    </svg>
  )
}
