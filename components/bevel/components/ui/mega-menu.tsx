"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Bevel MegaMenu is a wide panel built on the Popover surface, so it
 * carries no border and the 14px menu radius. The two columns are told apart
 * by one pixel of the track token, and each link is a 12px row that tints on
 * hover. Icons sit in an inner well, the same surface a chip uses inside a
 * card.
 */

/** One link in a mega-menu column. `icon` takes an Iconify name. */
export interface MegaMenuItem {
  title: string
  description?: string
  href?: string
  icon?: string
}

/** A titled column of links inside the panel. */
export interface MegaMenuSection {
  heading: string
  items: MegaMenuItem[]
}

/** Props for `MegaMenu`; `trigger` is the control the panel opens from. */
export interface MegaMenuProps {
  trigger: React.ReactNode
  sections: MegaMenuSection[]
  className?: string
}

const MegaMenu = ({ trigger, sections, className }: MegaMenuProps) => (
  <Popover>
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
    <PopoverContent align="start" className={cn("w-[40rem] p-0", className)}>
      <div className="grid grid-cols-2 divide-x divide-[var(--track)] p-2.5">
        {sections.map((section) => (
          <div key={section.heading} className="px-2.5">
            <h4 className="mb-2 px-2.5 text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-muted-foreground">
              {section.heading}
            </h4>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href ?? "#"}
                  className={cn(
                    "flex items-start gap-3 rounded-[0.75rem] px-2.5 py-2",
                    "transition-colors duration-fast",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  {item.icon && (
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[0.5rem] bg-[var(--inner)] text-primary [box-shadow:var(--shadow-inset)]">
                      <Icon icon={item.icon} className="size-[1.125rem]" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[0.0188rem] text-foreground">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="mt-1 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PopoverContent>
  </Popover>
)
MegaMenu.displayName = "MegaMenu"

export { MegaMenu }
