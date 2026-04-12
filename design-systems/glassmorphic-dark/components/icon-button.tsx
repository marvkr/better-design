import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:brightness-90 active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-xl bg-white/10 text-white " +
          "shadow-[inset_0_0_8px_rgba(255,255,255,0.15)] " +
          "hover:brightness-125",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-white/[0.06] hover:text-foreground",
        outline:
          "bg-transparent text-foreground " +
          "border border-white/[0.15] " +
          "hover:bg-white/[0.06]",
      },
      size: {
        sm: "h-8 w-8 [&>svg]:h-3.5 [&>svg]:w-3.5",
        default: "h-10 w-10 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
