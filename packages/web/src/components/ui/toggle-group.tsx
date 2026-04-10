"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import { useDataState, springInteraction } from "@/lib/motion"

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
  const isSingle = (props as { type?: string }).type === "single"

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
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
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "relative min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l data-[state=on]:bg-transparent",
        className
      )}
      {...props}
    >
      <AnimatePresence initial={false}>
        {isOn && (
          <motion.div
            key="indicator"
            layoutId={context.isSingle ? `toggle-indicator-${context.uid}` : undefined}
            className="absolute inset-0 rounded-[inherit] bg-accent"
            initial={context.isSingle ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={context.isSingle ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={springInteraction}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
