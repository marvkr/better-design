import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, quietBevel, raisedBevel } from "./_shared";

/**
 * Burnished Button: a bevelled pill.
 *
 * The default is the signature: a cream bevel set inside a copper ring that
 * turns once every fourteen seconds while a fine pointer rests on it or it has keyboard focus, and glows ember on hover. At rest the ring stays still, so a page full of buttons paints nothing per frame.
 * The ring and the cream face are layers behind the label, so the button
 * keeps one box and `asChild` still works. Every other variant is a bevel
 * from `_shared`: graphite for outline, a darker quiet face for secondary,
 * and the warm "lit" gradient for the one featured action on a page.
 * Every press scales the pill a little toward the page.
 */
const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2.5 whitespace-nowrap",
    "rounded-full font-semibold tracking-[0.016em]",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        primary: "text-primary-foreground",
        lit: "bg-(image:--fill-lit) text-(--lit-foreground) shadow-(--bevel-lit)",
        secondary: quietBevel,
        outline: raisedBevel,
        ghost:
          "bg-transparent text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
        destructive:
          "bg-(image:--fill-destructive) text-destructive-foreground shadow-(--bevel-primary)",
        link: "h-auto rounded-sm px-0 text-primary-text underline decoration-current/30 underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-current",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-5 text-[0.9375rem]",
        lg: "h-12 px-6 text-base",
        icon: "size-11 px-0",
        "icon-sm": "size-9 px-0",
        "icon-lg": "size-12 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** Variants that wear the copper ring and the cream face. */
const RINGED = new Set(["default", "primary"]);

/**
 * The copper ring and the cream face, drawn behind the label. The ring sits
 * 0.1875rem outside the button's box and its conic gradient turns; a sheen
 * lights its top and shades its bottom so it reads as metal.
 */
function ButtonRing() {
  return (
    <>
      <span
        aria-hidden
        data-slot="button-ring"
        className={cn(
          "pointer-events-none absolute -inset-[0.1875rem] -z-20 overflow-hidden rounded-[inherit]",
          "shadow-(--ring-rim) transition-shadow duration-slow ease-(--ease-out)",
          "[@media(hover:hover)_and_(pointer:fine)]:group-hover/button:shadow-(--bevel-glow)",
        )}
      >
        <span className="absolute left-1/2 top-1/2 aspect-square w-[max(150%,6rem)] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(var(--ring-flow))] [@media(hover:hover)_and_(pointer:fine)]:group-hover/button:animate-[spin_14s_linear_infinite] group-focus-visible/button:animate-[spin_14s_linear_infinite] motion-reduce:animate-none!" />
        <span className="absolute inset-0 bg-(image:--ring-sheen)" />
      </span>
      <span
        aria-hidden
        data-slot="button-face"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[inherit]",
          "bg-(image:--fill-primary) shadow-(--bevel-primary)",
          "[@media(hover:hover)_and_(pointer:fine)]:group-hover/button:bg-(image:--fill-primary-hover)",
        )}
      />
    </>
  );
}

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const ringed = RINGED.has(variant ?? "default");
    return (
      <Comp
        type={asChild ? undefined : "button"}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {ringed && <ButtonRing />}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
