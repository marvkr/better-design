# Duolingo Design System

**SYSTEM_NAME:** duolingo
**DISPLAY_NAME:** Duolingo Design System
**DESCRIPTION:** Playful, gamified design system that makes learning fun and engaging with vibrant colors and achievement-focused interactions
**INDUSTRY:** education, e-learning, gamification
**PERSONALITY:** playful, gamified, motivating, fun, energetic

----------------------------------------

**COMPONENT:** globals
**DESCRIPTION:** Global CSS styles and design tokens for the Duolingo design system including vibrant colors, playful typography, gamification elements, and motivating animations
**LANGUAGE:** css
**DESTINATION:** globals.css
**CODE:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 1rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.25 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.25 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.25 0 0);
  --primary: oklch(0.75 0.17 142.5); /* Duolingo Green #58CC02 */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.7 0.15 65.3); /* Duolingo Orange #FF9600 */
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --accent: oklch(0.8 0.15 285.7); /* Duolingo Purple #CE82FF */
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.65 0.19 22.8); /* Duolingo Red #FF4B4B */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.75 0.17 142.5);
  --chart-1: oklch(0.75 0.17 142.5);
  --chart-2: oklch(0.7 0.15 65.3);
  --chart-3: oklch(0.8 0.15 285.7);
  --chart-4: oklch(0.75 0.15 210.5); /* Duolingo Blue #1CB0F6 */
  --chart-5: oklch(0.8 0.12 85.2); /* Duolingo Yellow #FFC800 */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.25 0 0);
  --sidebar-primary: oklch(0.75 0.17 142.5);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.25 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.55 0 0);
}

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

* {
  border-color: var(--border);
}

body {
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}

/* Gamification Elements */
.progress-bar {
  width: 100%;
  height: 0.75rem;
  background-color: var(--muted);
  border-radius: var(--radius);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  transition: width 0.5s ease-in-out;
}

/* Playful Animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

----------------------------------------

**COMPONENT:** button
**DESCRIPTION:** Duolingo-style playful button with vibrant green color, rounded corners, and satisfying hover effects for learning actions, progress confirmation, and gamified interactions
**USE_CASES:** lesson completion, quiz submission, progress tracking, achievement unlocking, skill practice
**LANGUAGE:** tsx
**DESTINATION:** components/ui/button.tsx
**CODE:**
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl border-b-4 border-primary/80 hover:border-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl border-b-4 border-secondary/80 hover:border-secondary/90",
        success: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-b-4 border-primary/80 animate-pulse",
        warning: "bg-chart-5 text-foreground hover:bg-chart-5/90 shadow-lg border-b-4 border-chart-5/80",
        error: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg border-b-4 border-destructive/80",
        outline: "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10 rounded-lg",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
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

**COMPONENT:** progress
**DESCRIPTION:** Duolingo-style progress bar with vibrant gradient colors, smooth animations, and celebratory effects for lesson completion and skill advancement
**USE_CASES:** lesson progress, skill levels, achievement tracking, learning streaks, course completion
**LANGUAGE:** tsx
**DESTINATION:** components/ui/progress.tsx
**CODE:**
```tsx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {value === 100 && (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white animate-bounce">🎉</span>
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

----------------------------------------

**COMPONENT:** card
**DESCRIPTION:** Duolingo-style card component with colorful accents, playful shadows, and engaging hover effects perfect for lesson cards and achievement displays
**USE_CASES:** lesson cards, achievement displays, skill showcases, progress summaries, learning content
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
      "rounded-xl border bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-102 overflow-hidden",
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
      "text-lg font-bold leading-none tracking-tight text-foreground",
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

**COMPONENT:** badge
**DESCRIPTION:** Duolingo-style badge component with vibrant colors and playful design for achievements, skill levels, and learning milestones
**USE_CASES:** achievement badges, skill levels, progress indicators, streak counters, reward displays
**LANGUAGE:** tsx
**DESTINATION:** components/ui/badge.tsx
**CODE:**
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
        accent: "border-transparent bg-accent text-accent-foreground shadow hover:bg-accent/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "border-primary text-primary bg-transparent",
        success: "border-transparent bg-primary text-primary-foreground shadow animate-pulse",
        warning: "border-transparent bg-chart-5 text-foreground shadow",
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