import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "relative overflow-hidden rounded-lg text-white group",
        secondary: "relative overflow-hidden rounded-lg bg-white text-foreground dark:bg-[#110f23] dark:text-white group",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-md",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-card dark:border-input dark:hover:bg-accent rounded-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-5 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Gradient layer component for primary/secondary buttons
function GradientLayers({ variant }: { variant: "default" | "secondary" }) {
  if (variant === "default") {
    return (
      <>
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0 rounded-lg border border-white/25 shadow-[0_2px_5px_oklch(0.85_0.15_265_/_0.25)]"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-mid) 50%, var(--primary-gradient-end))",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 z-[1] rounded-lg border border-white/25 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-40"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-hover-mid) 50%, var(--primary-gradient-end))",
          }}
        />
      </>
    )
  }

  return (
    <>
      {/* Light mode gradient */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 rounded-lg border border-black/10 dark:hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0.06))",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 z-[1] rounded-lg border border-black/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.06))",
        }}
      />
      {/* Dark mode gradient */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 rounded-lg border border-white/25 hidden dark:block"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.2))",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 z-[1] rounded-lg border border-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden dark:block"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.1))",
        }}
      />
    </>
  )
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const hasGradient = variant === "default" || variant === "secondary" || variant === undefined
  const effectiveVariant = variant === "secondary" ? "secondary" : "default"

  // For asChild with gradient, we need to clone the child and inject gradient layers
  if (asChild && hasGradient) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    return React.cloneElement(child, {
      ...props,
      className: cn(buttonVariants({ variant, size, className }), child.props.className),
      children: (
        <>
          <GradientLayers variant={effectiveVariant} />
          <span className="relative z-[2] inline-flex items-center gap-2">{child.props.children}</span>
        </>
      ),
    } as React.HTMLAttributes<HTMLElement>)
  }

  // For asChild without gradient, use Slot normally
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  // Regular button with gradient
  if (hasGradient) {
    return (
      <button
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <GradientLayers variant={effectiveVariant} />
        <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
      </button>
    )
  }

  // Regular button without gradient
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
