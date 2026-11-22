"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

/**
 * Airy docs Command: the docs search palette.
 *
 * A white panel with a 0.75rem corner and a hairline ring. The query sits
 * in a borderless row at the top, ruled off from the results by a hairline,
 * the way a docs search modal reads. Results group under small semibold
 * section names, and the keyboard selection takes the pale tray colour.
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    data-slot="command"
    className={cn(
      popoverSurface,
      "flex size-full flex-col overflow-hidden",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  children?: React.ReactNode;
  /** Read by screen readers only. */
  title?: string;
  /** Read by screen readers only. */
  description?: string;
};

/** The palette inside a dialog, opened with a keyboard shortcut such as Cmd K. */
const CommandDialog = ({
  children,
  title = "Search the docs",
  description = "Search pages, sections and commands",
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent
      showCloseButton={false}
      className="top-[18vh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl"
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">{description}</DialogDescription>
      <Command className="rounded-2xl shadow-none [&_[cmdk-item]]:min-h-10 [&_[cmdk-list]]:max-h-96">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    data-slot="command-input-wrapper"
    className="flex shrink-0 items-center gap-2.5 border-b border-border px-3.5"
    cmdk-input-wrapper=""
  >
    <Icon
      icon="feather:search"
      className="pointer-events-none size-4 shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="command-input"
      className={cn(
        "flex h-11 w-full bg-transparent text-sm text-foreground outline-none",
        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    data-slot="command-list"
    className={cn(
      "max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden",
      className,
    )}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    data-slot="command-empty"
    className={cn("py-10 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-slot="command-group"
    className={cn(
      "overflow-hidden p-1.5 text-foreground",
      "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-1.5 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-foreground",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    data-slot="command-separator"
    className={cn("h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * A result row. cmdk writes data-disabled="false" on every row, so the row
 * keys its disabled look to the "true" value rather than sharing menuItemBase.
 */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="command-item"
    className={cn(
      "relative flex min-h-9 cursor-default select-none items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-(--foreground-secondary) outline-none transition-colors duration-fast",
      "data-[selected=true]:bg-accent data-[selected=true]:text-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:text-(--foreground-disabled)",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="command-shortcut"
    className={cn("ms-auto ps-3 font-mono text-xs text-muted-foreground", className)}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
