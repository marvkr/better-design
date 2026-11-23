"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springInteraction } from "@/lib/motion"

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
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
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
        "origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-[0_0.125rem_0.5rem_oklch(0_0_0/0.08),0_0.375rem_1.25rem_oklch(0_0_0/0.06),0_0_0_0.0625rem_var(--border)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

function DropdownMenuContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const dataState = useDataState(ref)
  const isOpen = dataState === "open"

  return (
    <DropdownMenuPrimitive.Portal forceMount>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        forceMount
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground",
          "shadow-[0_0.125rem_0.5rem_oklch(0_0_0/0.08),0_0.375rem_1.25rem_oklch(0_0_0/0.06)]",
          "data-[state=closed]:pointer-events-none",
          className
        )}
        {...props}
      >
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="dropdown-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springInteraction}
              style={{
                transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuPrimitive.Content>
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
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
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
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
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
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
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
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
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

// Pixelarticons, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "pixelarticons:check" "pixelarticons:chevron-right"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M10 18H8v-2h2zm-2-2H6v-2h2zm4-2v2h-2v-2zm-6 0H4v-2h2zm8 0h-2v-2h2zm2-2h-2v-2h2zm2-2h-2V8h2zm2-2h-2V6h2z"/>
    </svg>
  )
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M16 13v-2h-2v2zm-2-2V9h-2v2zm0 4v-2h-2v2zm-2-6V7h-2v2zm0 8v-2h-2v2zM10 7V5H8v2zm0 12v-2H8v2z"/>
    </svg>
  )
}
