"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, menuItemBase } from "./_shared";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** One link in a mega-menu column. `icon` takes an Iconify name, such as `solar:compass-linear`. */
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
 * from your own control, or `items` for a bar of small triggers that each
 * open their own panel.
 */
export interface MegaMenuProps {
  trigger?: React.ReactNode;
  sections?: MegaMenuSection[];
  items?: MegaMenuBarEntry[];
  className?: string;
}

const linkRow = cn(menuItemBase, "h-auto min-h-8 items-start gap-2.5 py-1.5 hover:bg-(--field)", focusRing);

const columnHeading = "mb-1 px-2.5 py-1 text-xs font-medium text-muted-foreground";

function SectionColumns({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <div className="grid grid-cols-2 gap-1 p-2">
      {sections.map((section) => (
        <div key={section.heading}>
          <h4 className={columnHeading}>{section.heading}</h4>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <a key={item.title} href={item.href ?? "#"} data-slot="mega-menu-link" className={linkRow}>
                {item.icon && (
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-(--mark) text-(--mark-foreground)">
                    <Icon icon={item.icon} className="size-4 text-(--mark-foreground)" aria-hidden />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-snug text-foreground">{item.title}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs leading-normal text-muted-foreground">
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
  "inline-flex h-7.5 items-center gap-1 rounded-lg px-2.5 text-sm text-foreground",
  "transition-colors duration-fast ease-(--ease-out) hover:bg-accent data-[state=open]:bg-(--field)",
  focusRing,
);

/**
 * Margin MegaMenu: a wide piece of the shared white floating panel holding
 * columns of links. Link icons sit in small soft-oxblood squares, and rows turn
 * field grey on hover.
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
                icon="solar:alt-arrow-down-linear"
                aria-hidden="true"
                className="size-3 text-muted-foreground transition-transform duration-fast group-data-[state=open]:rotate-180 motion-reduce:transition-none"
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              data-slot="mega-menu-content"
              className={cn("w-auto min-w-80 p-2", className)}
            >
              <div className="grid auto-cols-fr grid-flow-col gap-1">
                {entry.columns.map((column) => (
                  <div key={column.title}>
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
        className={cn("w-xl max-w-screen p-0", className)}
      >
        <SectionColumns sections={sections ?? []} />
      </PopoverContent>
    </Popover>
  );
};
MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
