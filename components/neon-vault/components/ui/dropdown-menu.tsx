"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

// Neon Vault DropdownMenu: a floating vault panel. Elevated dark popover with
// the layered DS shadow, rounded-xl shell, magenta-lit checks and accents.

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-md px-2.5 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4 text-muted-foreground" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground",
        "[box-shadow:var(--shadow-popover)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground",
          "[box-shadow:var(--shadow-popover)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center text-primary-bright">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-3.5 w-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center text-primary-bright">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="h-2 w-2 rounded-full bg-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
      {...props}
    />
  )
}
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

// Solar, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "solar:check-bold" "solar:alt-arrow-right-bold"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M18.4697 6.46967C18.7626 6.17678 19.2373 6.17678 19.5302 6.46967C19.8231 6.76256 19.8231 7.23732 19.5302 7.53022L9.53022 17.5302C9.23732 17.8231 8.76256 17.8231 8.46967 17.5302L4.46967 13.5302C4.17678 13.2373 4.17678 12.7626 4.46967 12.4697C4.76256 12.1768 5.23732 12.1768 5.53022 12.4697L8.99994 15.9394L18.4697 6.46967Z"/>
    </svg>
  )
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M15.8351 11.6296L9.20467 5.1999C8.79094 4.79869 8 5.04189 8 5.5703L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L15.8351 12.3704C16.055 12.1573 16.0549 11.8427 15.8351 11.6296Z"/>
    </svg>
  )
}
