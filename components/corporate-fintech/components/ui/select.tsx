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

// Ant Design Icons, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "ant-design:check-outlined" "ant-design:down-outlined"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8"/>
    </svg>
  )
}
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2L227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7"/>
    </svg>
  )
}
