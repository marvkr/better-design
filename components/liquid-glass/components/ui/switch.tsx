"use client"

import * as React from "react"
import type * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { Switch as GlassSwitch } from "./glass-switch"

/*
 * Liquid Glass Switch — the kit's flip: an iOS-proportioned track whose white
 * knob swells into clear glass while it crosses, bending the track beneath it,
 * then settles. Drag the knob or press the track. Drawn by one shared WebGL2
 * renderer (three.js), so a page full of switches stays on one GPU context.
 * The system is light, so the glass keeps its light tokens on a dark page.
 * It takes the shadcn Switch props: checked, defaultChecked, onCheckedChange.
 *
 * Under the canvas sits the same switch in CSS: the look before the glass
 * draws, and the whole switch where WebGL2 is missing. The canvas paints an
 * opaque track over it, so the two never show at once. Its thumb stretches
 * from its resting edge while the switch is pressed, as the glass knob swells.
 */
type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "md" | "lg"
}

function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  size = "md",
  "aria-label": ariaLabel,
}: SwitchProps) {
  const [own, setOwn] = React.useState(defaultChecked)
  const on = checked ?? own
  return (
    <span
      data-slot="switch"
      data-state={on ? "checked" : "unchecked"}
      className={cn("group/switch relative isolate inline-flex", className)}
    >
      <span
        aria-hidden
        data-state={on ? "checked" : "unchecked"}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-(--track) transition-colors duration-base data-[state=checked]:bg-(--glass-accent)"
      >
        <span
          data-state={on ? "checked" : "unchecked"}
          className="absolute top-[0.13rem] left-[0.13rem] h-[calc(100%-0.26rem)] w-[59%] rounded-full bg-background [box-shadow:var(--shadow-knob)] transition-[left,scale] duration-base ease-out group-active/switch:scale-x-[1.18] origin-left data-[state=checked]:origin-right data-[state=checked]:left-[calc(41%-0.13rem)]"
        />
      </span>
      <GlassSwitch
        id={id}
        aria-label={ariaLabel}
        label=""
        theme="light"
        size={size}
        checked={on}
        disabled={disabled}
        onChange={(next) => {
          setOwn(next)
          onCheckedChange?.(next)
        }}
      />
    </span>
  )
}

export { Switch }
