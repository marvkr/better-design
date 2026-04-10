# Airbnb Design System

**SYSTEM_NAME:** airbnb
**DISPLAY_NAME:** Airbnb Design System
**DESCRIPTION:** Warm, welcoming design system focused on trust, belonging, and human connection with signature coral red and friendly interactions
**INDUSTRY:** travel, hospitality, marketplace
**PERSONALITY:** warm, welcoming, trustworthy, community-driven, inclusive

----------------------------------------

**COMPONENT:** globals
**DESCRIPTION:** Global CSS styles and design tokens for the Airbnb design system including colors, typography, spacing, and base component styles
**LANGUAGE:** css
**DESTINATION:** globals.css
**CODE:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 0.75rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.3 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.3 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.3 0 0);
  --primary: oklch(0.625 0.19 22.8); /* Airbnb Rausch #FF5A5F */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.65 0.15 187.5); /* Airbnb Babu #00A699 */
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --accent: oklch(0.7 0.18 45.2); /* Airbnb Arches #FC642D */
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.625 0.19 22.8);
  --chart-1: oklch(0.625 0.19 22.8);
  --chart-2: oklch(0.65 0.15 187.5);
  --chart-3: oklch(0.7 0.18 45.2);
  --chart-4: oklch(0.6 0.12 280);
  --chart-5: oklch(0.75 0.1 140);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.3 0 0);
  --sidebar-primary: oklch(0.625 0.19 22.8);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.3 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.55 0 0);
}

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

* {
  border-color: var(--border);
}

body {
  font-family: "DM Sans", "Cereal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}
```

----------------------------------------

**COMPONENT:** button
**DESCRIPTION:** Airbnb-style primary button with warm coral red color, friendly rounded corners, and welcoming hover effects for booking, hosting, and search actions
**USE_CASES:** booking confirmation, host signup, search actions, profile completion, call-to-action
**LANGUAGE:** tsx
**DESTINATION:** components/ui/button.tsx
**CODE:**
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "text-primary hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

----------------------------------------

**COMPONENT:** card
**DESCRIPTION:** Airbnb-style card component with subtle shadows, rounded corners, and hover effects perfect for property listings, host profiles, and experience showcases
**USE_CASES:** property listings, host profiles, experience cards, feature showcases, content containers
**LANGUAGE:** tsx
**DESTINATION:** components/ui/card.tsx
**CODE:**
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

----------------------------------------

**COMPONENT:** input
**DESCRIPTION:** Airbnb-style input field with clean borders, focused coral accent, and friendly placeholder text for search, booking forms, and user profiles
**USE_CASES:** search forms, booking details, user registration, profile editing, contact forms
**LANGUAGE:** tsx
**DESTINATION:** components/ui/input.tsx
**CODE:**
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

----------------------------------------

**COMPONENT:** badge
**DESCRIPTION:** Airbnb-style badge component with soft colors and rounded design for host status, property features, and user achievements
**USE_CASES:** host badges, property amenities, user status, feature highlights, categorization
**LANGUAGE:** tsx
**DESTINATION:** components/ui/badge.tsx
**CODE:**
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "border-primary text-primary bg-transparent",
        success: "border-transparent bg-green-100 text-green-800 shadow",
        warning: "border-transparent bg-yellow-100 text-yellow-800 shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```