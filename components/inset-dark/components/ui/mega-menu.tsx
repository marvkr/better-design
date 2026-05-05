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
  trigger: React.ReactNode
  sections: MegaMenuSection[]
  className?: string
}

const MegaMenu = ({ trigger, sections, className }: MegaMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("w-[640px] p-0", className)}
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
                      "group flex items-start gap-3 rounded-md p-2",
                      "transition-[background-color,box-shadow] duration-150",
                      "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.icon && (
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-primary [box-shadow:var(--shadow-s)]">
                        <Icon icon={item.icon} className="h-4 w-4" />
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                      {item.description && (
                        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
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
