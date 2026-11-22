"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface MegaMenuItem {
  title: string
  description?: string
  href?: string
  icon?: string
}

export interface MegaMenuSection {
  heading: string
  items: MegaMenuItem[]
}

export interface MegaMenuProps {
  trigger: React.ReactElement
  sections: MegaMenuSection[]
  className?: string
}

const MegaMenu = ({ trigger, sections, className }: MegaMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-[40rem] rounded-xl border border-border bg-popover p-0 text-popover-foreground [box-shadow:var(--shadow-lg)]",
          className,
        )}
      >
        <div className="grid grid-cols-2 gap-0 p-4">
          {sections.map((section) => (
            <div key={section.heading} className="p-2">
              <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.heading}
              </h4>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href ?? "#"}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg p-2",
                      "transition-[background-color,box-shadow] duration-fast",
                      "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.icon && (
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground [box-shadow:var(--shadow-tile)]">
                        <Icon icon={item.icon} className="h-4 w-4" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium leading-none text-foreground">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
}
MegaMenu.displayName = "MegaMenu"

export { MegaMenu }
