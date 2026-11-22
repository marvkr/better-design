/*
 * Copyright (c) 2025 Keenthemes Inc. MIT License, from https://github.com/keenthemes/reui
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Icon tile: a square surface that gives an icon a consistent size, radius and
// fill, ported from the MIT-licensed source above. Five variants and five sizes
// keep one proportion; each design system's tokens give it its look.
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The root owns four variables so every part stays in proportion: the tile
 * size, the glyph size, the corner radius and the inset between the outer
 * ring and the inner card. The soft and frame variants paint the inner card
 * with an ::after layer under the icon, so the tile needs no extra node. The
 * soft and solid variants take their colour from currentColor, so one text
 * colour class retints the whole tile.
 */
const iconTileVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center align-middle",
    "size-(--icon-tile-size) rounded-(--icon-tile-radius)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-(--icon-tile-icon-size)",
  ],
  {
    variants: {
      variant: {
        /** A plain bordered surface, the quiet default for list rows and toolbars. */
        outline: "border border-border bg-background",
        /** A raised muted fill with a background-coloured ring, which reads as a chip. */
        elevated: "border-2 border-background bg-muted text-foreground shadow-xs",
        /** A tinted ring around a bordered inner card, both from currentColor. */
        soft: [
          "isolate p-(--icon-tile-inset) text-primary bg-current/10",
          "after:absolute after:-z-10 after:inset-(--icon-tile-inset)",
          "after:rounded-[calc(var(--icon-tile-radius)-var(--icon-tile-inset))]",
          "after:border after:border-current/20 after:bg-current/5",
        ],
        /** A filled tone with a contrasting glyph. */
        solid: "bg-primary text-primary-foreground",
        /** A muted ring around an inset card. */
        frame: [
          "isolate border border-border bg-muted/50 p-(--icon-tile-inset)",
          "after:absolute after:-z-10 after:inset-(--icon-tile-inset)",
          "after:rounded-[calc(var(--icon-tile-radius)-var(--icon-tile-inset))]",
          "after:border after:border-border after:bg-card after:shadow-xs",
        ],
      },
      size: {
        xs: "[--icon-tile-size:--spacing(6)] [--icon-tile-icon-size:--spacing(3.5)] [--icon-tile-inset:--spacing(0.5)]",
        sm: "[--icon-tile-size:--spacing(8)] [--icon-tile-icon-size:--spacing(4)] [--icon-tile-inset:--spacing(0.5)]",
        default: "[--icon-tile-size:--spacing(10)] [--icon-tile-icon-size:--spacing(4.5)] [--icon-tile-inset:--spacing(0.75)]",
        lg: "[--icon-tile-size:--spacing(12)] [--icon-tile-icon-size:--spacing(5.5)] [--icon-tile-inset:--spacing(0.75)]",
        xl: "[--icon-tile-size:--spacing(14)] [--icon-tile-icon-size:--spacing(7)] [--icon-tile-inset:--spacing(1)]",
      },
      /**
       * The default radius follows the system's --radius, clamped to a third
       * of the tile, so a small tile keeps its corners instead of turning into
       * a circle. --radius is set wherever the system's tokens are, while the
       * --radius-* steps can live only in a theme block. full is always a circle.
       */
      radius: {
        default: "[--icon-tile-radius:min(var(--radius),calc(var(--icon-tile-size)/3))]",
        full: "[--icon-tile-radius:calc(infinity*1rem)]",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      radius: "default",
    },
  },
)

/** Props for an icon tile. Pass the icon as children; `render` swaps the span for another element. */
interface IconTileProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof iconTileVariants>["variant"]
  size?: VariantProps<typeof iconTileVariants>["size"]
  radius?: VariantProps<typeof iconTileVariants>["radius"]
}

/** A square surface that gives an icon a consistent size, radius and fill. */
function IconTile({
  className,
  variant = "outline",
  size = "default",
  radius = "default",
  render,
  ...props
}: IconTileProps) {
  const defaultProps = {
    "data-slot": "icon-tile",
    "data-variant": variant,
    "data-size": size,
    className: cn(iconTileVariants({ variant, size, radius, className })),
  }

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
  })
}

export { IconTile, iconTileVariants, type IconTileProps }
