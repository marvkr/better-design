"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import { useDataState, springInteraction } from "@/lib/motion"

// Precision ToggleGroup: segmented control on a muted rail. The active segment
// is a white pill with a whisper drop shadow, sliding via a calm layout spring.

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & { uid: string; isSingle: boolean }
>({
  size: "default",
  variant: "default",
  uid: "",
  isSingle: false,
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  const uid = React.useId()
  const isSingle = props.type === "single"

  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "flex items-center gap-1 rounded-md border border-border bg-muted p-1",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, uid, isSingle }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const ref = React.useRef<HTMLButtonElement>(null)
  const dataState = useDataState(ref)
  const isOn = dataState === "on"

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground",
        "data-[state=on]:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <AnimatePresence initial={false}>
        {isOn && (
          <motion.div
            key="indicator"
            layoutId={context.isSingle ? `toggle-indicator-${context.uid}` : undefined}
            className="absolute inset-0 rounded-sm bg-background shadow-[0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.08)]"
            initial={context.isSingle ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={context.isSingle ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={springInteraction}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
