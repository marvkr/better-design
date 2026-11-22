"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, menuItemBase, raisedBevel } from "./_shared";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** One link in a mega-menu column. `icon` takes an Iconify name, such as `ph:compass`. */
export interface MegaMenuItem {
  title: string;
  description?: string;
  href?: string;
  icon?: string;
}

/** A titled column of links inside the panel. */
export interface MegaMenuSection {
  heading: string;
  items: MegaMenuItem[];
}

/** One top-level menu in the bar form: a label and its columns of plain links. */
export interface MegaMenuBarEntry {
  id: string;
  label: string;
  columns: { title: string; items: string[] }[];
}

/**
 * Props for `MegaMenu`. Pass `trigger` and `sections` for one panel opened
 * from your own control, or `items` for a bar of pill triggers that each
 * open their own panel.
 */
export interface MegaMenuProps {
  trigger?: React.ReactNode;
  sections?: MegaMenuSection[];
  items?: MegaMenuBarEntry[];
  className?: string;
}

const linkRow = cn(
  menuItemBase,
  "items-start gap-3 px-2.5 py-2",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-foreground",
  focusRing,
);

const columnHeading = "mb-2 px-2.5 text-xs font-semibold text-muted-foreground";

function SectionColumns({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {sections.map((section) => (
        <div key={section.heading} className="p-1">
          <h4 className={columnHeading}>{section.heading}</h4>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <a key={item.title} href={item.href ?? "#"} data-slot="mega-menu-link" className={linkRow}>
                {item.icon && (
                  <span
                    className={cn(
                      raisedBevel,
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-primary-text",
                    )}
                  >
                    <Icon icon={item.icon} className="size-4" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug text-foreground">{item.title}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const barTrigger = cn(
  "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold tracking-[0.016em] text-foreground",
  "transition-colors duration-fast",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent data-[state=open]:bg-accent",
  focusRing,
);

/**
 * Burnished MegaMenu: a wide piece of the shared floating panel, the raised
 * umber plate with a lit top edge and a dark rim, holding columns of links.
 * Link icons sit in small graphite bevels; rows light to the accent.
 */
const MegaMenu = ({ trigger, sections, items, className }: MegaMenuProps) => {
  if (items && items.length > 0 && !sections) {
    return (
      <nav data-slot="mega-menu" className="flex items-center gap-1">
        {items.map((entry) => (
          <Popover key={entry.id}>
            <PopoverTrigger className={cn(barTrigger, "group")}>
              {entry.label}
              <Icon
                icon="ph:caret-down"
                aria-hidden="true"
                className="size-3.5 text-muted-foreground transition-transform duration-base group-data-[state=open]:rotate-180 motion-reduce:transition-none"
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              data-slot="mega-menu-content"
              className={cn("w-auto min-w-[22rem] p-3", className)}
            >
              <div className="grid auto-cols-fr grid-flow-col gap-2">
                {entry.columns.map((column) => (
                  <div key={column.title} className="p-1">
                    <h4 className={columnHeading}>{column.title}</h4>
                    <div className="flex flex-col gap-0.5">
                      {column.items.map((label) => (
                        <a key={label} href="#" data-slot="mega-menu-link" className={linkRow}>
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </nav>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        data-slot="mega-menu-content"
        className={cn("w-[40rem] max-w-[calc(100vw-2rem)] p-0", className)}
      >
        <SectionColumns sections={sections ?? []} />
      </PopoverContent>
    </Popover>
  );
};
MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
