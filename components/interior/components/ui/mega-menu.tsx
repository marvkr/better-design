"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/*
 * Interior MegaMenu — a wide 11px float split into columns. Section headings
 * are the uppercase label; rows take the well tint on hover; each glyph sits
 * in a square 7px well tile, never a circle.
 */

export interface MegaMenuItem {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface MegaMenuSection {
  heading: string;
  items: MegaMenuItem[];
}

export interface MegaMenuProps {
  trigger: React.ReactNode;
  sections: MegaMenuSection[];
  className?: string;
}

export function MegaMenu({ trigger, sections, className }: MegaMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className={cn("w-[40rem] p-4", className)}>
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => (
            <div key={section.heading} className="space-y-1">
              <h4 className="px-2.5 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {section.heading}
              </h4>
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href ?? "#"}
                  className={cn(
                    "flex gap-2.5 rounded-[0.5rem] px-2.5 py-2",
                    "transition-colors duration-fast hover:bg-secondary",
                    "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
                  )}
                >
                  {item.icon ? (
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[0.4375rem] bg-secondary text-muted-foreground shadow-[var(--shadow-well)] [&_svg]:size-3.5">
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] font-medium text-foreground">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="block text-[0.7813rem] leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
