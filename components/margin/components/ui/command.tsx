"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

/**
 * Margin Command: the shared white floating panel with a light drop. A
 * search field sits on top behind one hairline, and rows turn field grey as
 * the keyboard moves through them.
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    data-slot="command"
    className={cn(popoverSurface, "flex h-full w-full flex-col overflow-hidden", className)}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  children?: React.ReactNode;
};

/** The command panel opened in a dialog, for a keyboard-first palette. */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="max-w-lg overflow-hidden p-0 [&>[data-slot=dialog-close]]:hidden">
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      <DialogDescription className="sr-only">Search for a command to run.</DialogDescription>
      <Command className="rounded-none bg-transparent shadow-none [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-input]]:h-11 [&_[cmdk-item]]:h-9">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

/** The search field at the top of the panel, with a magnifier. */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    data-slot="command-input-wrapper"
    className="flex items-center gap-2 border-b border-border px-3"
    cmdk-input-wrapper=""
  >
    <Icon icon="solar:magnifer-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="command-input"
      className={cn(
        "flex h-10 w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

/** The scrolling list of results. */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    data-slot="command-list"
    className={cn("max-h-72 overflow-y-auto overflow-x-hidden p-1", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

/** The line shown when no result matches. */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    data-slot="command-empty"
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/** A titled group of results. */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-slot="command-group"
    className={cn(
      "overflow-hidden text-foreground",
      "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

/** A hairline between groups. */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    data-slot="command-separator"
    className={cn("-mx-1 my-1 h-[0.0625rem] bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/** One result row; the row under the keyboard turns field grey. */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="command-item"
    className={cn(
      menuItemBase,
      "data-[selected=true]:bg-(--field) data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

/** The key hint at the end of a row. */
const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="command-shortcut"
    className={cn("ml-auto text-xs tabular-nums text-muted-foreground", className)}
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
