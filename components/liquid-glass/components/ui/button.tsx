"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { GlassLayer, type GlassMaterial } from "./glass-layer"

/*
 * Liquid Glass Button — the kit's GlassButton on the shadcn Button surface.
 * Every filled variant is a WebGL lens: it swells under the pointer on wobbly
 * springs and grows when pressed. Tinted glass takes its colour from the
 * button's own background class; clear glass bends the page behind it. The
 * classes below are the look before the glass draws, and the permanent look
 * without WebGL2. Ghost and link stay flat, as the kit's site chrome does.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap select-none outline-none " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-40 aria-disabled:opacity-40 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "border border-border bg-(--glass-fill) text-foreground backdrop-blur-md",
        glass:
          "border border-border bg-(--glass-fill) text-foreground backdrop-blur-md",
        ghost:
          "press text-muted-foreground hover:bg-(--glass-wash) hover:text-foreground",
        link: "press text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-4 text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-10 gap-2 px-5 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-10 gap-2 px-5 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2 px-6 text-[0.9375rem] [&_svg:not([class*='size-'])]:size-[1.125rem]",
        xl: "h-16 gap-2.5 px-8 text-lg [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

/** Which glass each variant is made of; null keeps the CSS look. */
const MATERIAL = {
  default: "tinted",
  primary: "tinted",
  secondary: "tinted",
  destructive: "tinted",
  outline: "clear",
  glass: "clear",
  ghost: null,
  link: null,
} as const satisfies Record<ButtonVariant, GlassMaterial | null>

/** The props a Button puts on its asChild element: the child's own, plus data attributes. */
type HostProps = React.HTMLAttributes<HTMLElement> & { [attribute: `data-${string}`]: string | undefined }

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Put the glass on the single child element (a router link) instead of a <button>. */
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const material = MATERIAL[variant ?? "default"]
  const classes = buttonVariants({ variant, size })
  // The glass layer must be the host's first child.
  const content = (label: React.ReactNode) => (
    <>
      {material ? <GlassLayer material={material} /> : null}
      {label}
    </>
  )
  const host = material ? { "data-glass-host": "" } : {}

  if (asChild && React.isValidElement<HostProps>(children)) {
    // SAFETY: asChild hands the button's attributes to an element of the caller's choosing, as
    // Radix Slot does; the handlers stay DOM event handlers, only their element type widens.
    const hostProps = { ...props, ...host, "data-slot": "button", className: cn(classes, children.props.className, className) } as Partial<HostProps>
    return React.cloneElement(children, hostProps, content(children.props.children))
  }

  return (
    <button
      data-slot="button"
      type={type}
      className={cn(classes, className)}
      {...host}
      {...props}
    >
      {content(children)}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
