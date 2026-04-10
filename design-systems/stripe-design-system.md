# Stripe Design System

**SYSTEM_NAME:** stripe
**DISPLAY_NAME:** Stripe Design System
**DESCRIPTION:** Professional, trustworthy design system for financial services with clean typography and confident interactions
**INDUSTRY:** fintech, payments, financial services
**PERSONALITY:** professional, trustworthy, confident, reliable, clean

----------------------------------------

**COMPONENT:** globals
**DESCRIPTION:** Global CSS styles and design tokens for the Stripe design system with professional colors, clean typography, and financial service aesthetics
**LANGUAGE:** css
**DESTINATION:** globals.css
**CODE:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 0.375rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.2 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2 0 0);
  --primary: oklch(0.35 0.15 258.7); /* Stripe Blue #635BFF */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.98 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.98 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.98 0 0);
  --accent-foreground: oklch(0.2 0 0);
  --destructive: oklch(0.6 0.2 25);
  --border: oklch(0.92 0 0);
  --input: oklch(0.92 0 0);
  --ring: oklch(0.35 0.15 258.7);
  --chart-1: oklch(0.35 0.15 258.7);
  --chart-2: oklch(0.65 0.1 145);
  --chart-3: oklch(0.7 0.15 45);
  --chart-4: oklch(0.55 0.12 300);
  --chart-5: oklch(0.6 0.08 200);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.2 0 0);
  --sidebar-primary: oklch(0.35 0.15 258.7);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.96 0 0);
  --sidebar-accent-foreground: oklch(0.2 0 0);
  --sidebar-border: oklch(0.92 0 0);
  --sidebar-ring: oklch(0.45 0 0);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  border-color: var(--border);
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.5;
  font-weight: 400;
}

/* Professional typography */
.font-mono {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
}
```

----------------------------------------

**COMPONENT:** button
**DESCRIPTION:** Stripe-style button with professional design, confident interactions, and trust-building aesthetics for financial actions
**USE_CASES:** payment actions, form submissions, account management, financial transactions, primary CTAs
**LANGUAGE:** tsx
**DESTINATION:** components/ui/button.tsx
**CODE:**
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "