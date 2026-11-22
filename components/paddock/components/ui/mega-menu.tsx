"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, menuItemBase, surfacePlate } from "./_shared";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** One link in a mega-menu column. `icon` takes an Iconify name, such as `mingcute:folder-line`. */
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
 * from your own control, or `items` for a bar of rounded triggers that each
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
  "items-start gap-3 px-2.5 py-2 hover:bg-accent hover:text-accent-foreground",
  focusRing,
);

const columnHeading = "mb-1 px-2.5 text-xs font-medium text-muted-foreground";

function SectionColumns({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <div className="grid grid-cols-2 gap-1 p-2">
      {sections.map((section) => (
        <div key={section.heading} className="p-1">
          <h4 className={columnHeading}>{section.heading}</h4>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <a key={item.title} href={item.href ?? "#"} data-slot="mega-menu-link" className={linkRow}>
                {item.icon && (
                  <span
                    className={cn(
                      surfacePlate,
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground",
                    )}
                  >
                    <Icon icon={item.icon} className="size-4" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">{item.title}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
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
  "inline-flex h-9 items-center gap-1 rounded-md px-3.5 text-sm font-medium text-muted-foreground",
  "transition-colors duration-fast hover:bg-accent hover:text-foreground",
  "data-[state=open]:bg-accent data-[state=open]:text-foreground",
  focusRing,
);

/**
 * Paddock MegaMenu: a wide piece of the shared white panel holding columns
 * of links. Link icons sit in small grey well tiles, and rows turn well grey
 * on hover or focus.
 */
const MegaMenu = ({ trigger, sections, items, className }: MegaMenuProps) => {
  if (items && items.length > 0 && !sections) {
    return (
      <nav data-slot="mega-menu" className="flex items-center gap-0.5">
        {items.map((entry) => (
          <Popover key={entry.id}>
            <PopoverTrigger className={cn(barTrigger, "group")}>
              {entry.label}
              <Icon
                icon="mingcute:down-line"
                aria-hidden="true"
                className="size-3.5 transition-transform duration-base group-data-[state=open]:rotate-180 motion-reduce:transition-none"
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              data-slot="mega-menu-content"
              className={cn("w-auto min-w-88 p-2", className)}
            >
              <div className="grid auto-cols-fr grid-flow-col gap-1">
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
        className={cn("w-160 max-w-(--radix-popover-content-available-width) p-0", className)}
      >
        <SectionColumns sections={sections ?? []} />
      </PopoverContent>
    </Popover>
  );
};
MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
