"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "./dialog"

/*
 * Plinth Command: a floating graphite palette. The search field is a
 * recessed well at the top; the highlighted row lifts to the raised control
 * fill; group heads and shortcuts are mono readouts.
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className)}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  children?: React.ReactNode
  title?: string
}

const CommandDialog = ({ children, title = "Command menu", ...props }: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="max-w-xl overflow-hidden p-0 [&>button:last-child]:hidden">
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Command className="rounded-3xl [&_[cmdk-item]]:py-2.5">{children}</Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="p-1.5 pb-0" cmdk-input-wrapper="">
    <div className="flex items-center gap-2 rounded-lg bg-input px-3 [box-shadow:var(--shadow-inset)]">
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[18.75rem] overflow-y-auto overflow-x-hidden p-1.5", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-muted-foreground" {...props} />
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
      "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1.5 my-1.5 h-px bg-border", className)} {...props} />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none",
      "transition-colors duration-fast",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto font-mono text-[0.6875rem] text-muted-foreground", className)} {...props} />
)
CommandShortcut.displayName = "CommandShortcut"

// feather:search
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21l-4.35-4.35" /></g>
    </svg>
  )
}

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
