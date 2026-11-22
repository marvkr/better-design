"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { rowBase } from "./_shared"
import { Dialog, DialogContent } from "./dialog"

/*
 * Bevel Command palette.
 *
 * The palette is a popover surface: 14px radius, no border, var(--shadow-lg).
 * The search field is separated from the list by one pixel of the track token,
 * drawn as an inset shadow rather than a border, so the palette keeps reading
 * as one piece. Items reuse the shared row recipe at the 8px menu-item step,
 * and the group headings drop to the 12.5px label with its wider tracking.
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-[0.875rem]",
      "bg-popover text-popover-foreground",
      "[box-shadow:var(--shadow-lg)]",
      className,
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

/** Props for `CommandDialog`, the palette shown inside the system's Dialog. */
type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  children?: React.ReactNode
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0">
      <Command className="[box-shadow:none] [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:text-[0.7813rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-[0.0188rem] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:size-[1.125rem] [&_[cmdk-item]]:px-2.5 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:size-[1.125rem]">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    cmdk-input-wrapper=""
    className="flex items-center gap-2.5 px-3.5 [box-shadow:inset_0_-0.0625rem_0_0_var(--track)]"
  >
    <Icon
      icon="solar:magnifier-linear"
      className="size-[1.125rem] shrink-0 text-muted-foreground"
    />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent py-3",
        "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
        "outline-none placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[18.75rem] overflow-y-auto overflow-x-hidden p-1.5",
      className,
    )}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      "py-6 text-center text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden text-foreground",
      "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.7813rem] [&_[cmdk-group-heading]]:leading-4 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-[0.0188rem] [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1.5 my-1.5 h-px bg-[var(--track)]", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      rowBase,
      "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg]:size-[1.125rem] [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
)
CommandShortcut.displayName = "CommandShortcut"

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
}
