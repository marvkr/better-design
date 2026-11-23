"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springInteraction } from "@/lib/motion"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-border bg-secondary px-3 py-2 text-sm",
        "shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.2)]",
        "placeholder:text-muted-foreground",
        "transition-[border-color,box-shadow] duration-fast",
        "hover:border-border/80",
        "focus:outline-none focus:border-primary/60 focus:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.1),0_0_0_0.1875rem_oklch(0.6317_0.1989_275.2408/0.2)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground",
          "shadow-[0_0.25rem_0.375rem_-0.0625rem_oklch(0_0_0/0.4),0_0.5rem_1.5rem_-0.25rem_oklch(0_0_0/0.5),0_0_0_0.0625rem_oklch(1_0_0/0.04)]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springInteraction}
          style={{ transformOrigin: "var(--radix-select-content-transform-origin)" }}
        >
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
        </motion.div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
SelectContent.displayName = SelectPrimitive.Content.displayName

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  )
}
SelectLabel.displayName = SelectPrimitive.Label.displayName

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
SelectItem.displayName = SelectPrimitive.Item.displayName

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
}
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}

// MingCute, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "mingcute:check-line" "mingcute:down-line"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.171 16.072L19.778 5.465c.409-.359 1.01-.404 1.414 0c.404.405.359 1.005 0 1.415L9.878 18.193c-.204.179-.429.293-.707.293s-.503-.114-.707-.293l-5.657-5.657c-.297-.339-.393-.8-.159-1.207c.34-.588 1.092-.629 1.574-.207Z"/>
    </svg>
  )
}
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m12 13.586l4.95-4.95c.481-.422 1.233-.381 1.573.207c.235.407.139.868-.159 1.207l-5.657 5.657c-.204.179-.429.293-.707.293s-.503-.114-.707-.293L5.636 10.05c-.179-.204-.293-.429-.293-.707c0-.927 1.053-1.281 1.707-.707Z"/>
    </svg>
  )
}
