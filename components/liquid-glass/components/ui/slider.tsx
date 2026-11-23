"use client"

import * as React from "react"
import type * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { RangeSlider } from "./glass-range-slider"

/*
 * Liquid Glass Slider — the kit's slide: at rest a white pill sits on the
 * track; held, it opens into a wide lens of clear glass that magnifies and
 * bends the track while it moves. Keyboard, Page Up and Page Down, and a
 * native range input underneath keep it accessible. It takes the shadcn
 * Slider props and drives the first thumb.
 */
type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  size?: "sm" | "md" | "lg" | "xl"
}

function Slider({
  className,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  size = "sm",
  "aria-label": ariaLabel,
}: SliderProps) {
  const [own, setOwn] = React.useState(defaultValue?.[0] ?? min)
  const current = value?.[0] ?? own
  return (
    <div data-slot="slider" className={cn("flex w-full items-center", className)}>
      <RangeSlider
        aria-label={ariaLabel ?? "Value"}
        className="max-w-none"
        label=""
        theme="light"
        showValue={false}
        size={size}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(next) => {
          setOwn(next)
          onValueChange?.([next])
          onValueCommit?.([next])
        }}
      />
    </div>
  )
}

export { Slider }
