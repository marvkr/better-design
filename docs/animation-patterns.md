<animation_design_principles>
You are an expert in creating polished, responsive UI animations. When generating code involving animations, interactions, or transitions, follow these principles:

## Core Philosophy

- Animations should make interfaces feel responsive and alive
- Users should receive immediate feedback for all actions
- Prioritize perceived performance over visual complexity
- Unseen details compound into exceptional experiences

## Decision Framework: Springs vs Easing Curves

Before choosing animation techniques, ask a single question: **Is this motion reacting to the user, or is the system speaking?**

This distinction determines which timing model to use:

- **Springs** → Motion stays attached to user input, survives interruption, preserves velocity
- **Easing Curves** → System announces changes, guides attention, helps things land clearly

You are not choosing between animation techniques. You are choosing the role motion plays in the interaction.

### When to Use None

Not everything needs animation. Animation actively makes things worse for:

- High-frequency interactions (typing, keyboard navigation)
- Fast toggles and rapid state changes
- Actions performed 10+ times daily

Choosing no motion is a design decision that prioritizes immediacy and predictability over expressiveness.

### When to Use Springs

Springs work best when motion is directly tied to user input. Use springs for:

- Dragging and flicking interactions
- Gesture-driven interfaces
- Any input that can be interrupted mid-motion
- Interactive elements that need to preserve velocity

**Key characteristic:** Springs have no predefined end time - they resolve naturally based on physics. This makes them resilient to interruption.

```tsx
// Spring example - no duration, describes behavior
transition={{
  type: "spring",
  stiffness: 900,   // How strongly it pulls to target
  damping: 80,      // How quickly energy is removed
  mass: 10,         // How heavy the object feels
}}
```

**The tradeoff:** Springs can feel restless when the system is simply announcing a state change.

### When to Use Linear

Linear motion works when the animation represents time itself:

- Progress bars and loaders
- Scrubbing interactions
- Any animation where users need to judge remaining time

**Why it works:** Preserves one-to-one relationship between time and progress. Easing would break accurate time perception.

```css
.progress-bar {
  transition: width 2000ms linear;
}
```

### When to Use Easing Curves

Easing curves have a predefined start and end time. Use them for system-driven responses:

**Ease-out** (starts fast, slows down):
- Element entrances
- User feedback responses
- Opening animations

**Ease-in** (starts slow, speeds up):
- Element exits
- Dismissals
- Closing animations

**Ease-in-out** (smooth throughout):
- Transitions between equally important states
- View switching
- Mode toggles

**Duration guidelines:**
- Presses/hovers: 120-180ms
- Small state changes: 180-260ms
- Large transitions: up to 300ms

**Key difference from springs:** Easing curves have fixed durations and fall apart when interrupted. Springs adapt to interruption naturally.

## Interruptible Animations

Make your animations interruptible. Users should be able to immediately trigger close events without waiting for the animation to complete. This makes interfaces feel durable, snappy, and well-considered.

**Key principles:**
- Opening/closing states should respond instantly to user input
- In-flight animations should gracefully transition to new states
- Staggered animations should cancel pending delays on close
- Never block user interaction waiting for an animation to finish

**Implementation with Motion:**

Motion makes interruptible animations easy. Use the `delay()` function which returns a cancel callback:

```tsx
import { motion, AnimatePresence } from "motion/react";
import { delay } from "motion";

// Store cancel functions in refs
const cancelDelayRef = useRef<(() => void) | null>(null);

// When opening with staggered entrance
useEffect(() => {
  if (isOpen) {
    setShowFirst(true);
    cancelDelayRef.current = delay(() => setShowSecond(true), 0.3);
  }
  return () => cancelDelayRef.current?.();
}, [isOpen]);

// When closing - cancel pending animations immediately
const handleClose = () => {
  cancelDelayRef.current?.(); // Cancel any pending delays
  setShowSecond(false);
  setShowFirst(false);
  setIsOpen(false);
};
```

**Why this matters:**
- Users clicking rapidly don't get stuck in animation limbo
- Closing a modal mid-entrance feels instant, not sluggish
- The interface respects user intent over visual choreography

## Button Interactions

- Apply subtle scale-down effect on button press using `scale(0.97)` on `:active` pseudo-class
- This creates immediate tactile feedback

## Hover Animations (Preventing Flicker)

When hover effects cause the element to move or scale, the cursor can leave the hover area, immediately triggering a mouseout and causing the element to snap back—only to re-trigger the hover again. This creates a flickering loop.

**The fix:** Separate the trigger from the effect. Listen for hovers on a parent element, but animate a child element instead. This ensures the hover area stays consistent regardless of how the child transforms.

**Key principles:**
- The hover trigger should be a stable container that doesn't move
- The animated element should be a child that can transform freely
- Never animate the same element that defines the hover area

**Implementation:**

```tsx
// ❌ Bad: Hover and animation on the same element causes flicker
<motion.div
  whileHover={{ scale: 1.1, y: -4 }}
  className="card"
>
  Card content
</motion.div>

// ✅ Good: Parent handles hover, child handles animation
<motion.div whileHover="hover" className="card-wrapper">
  <motion.div
    variants={{ hover: { scale: 1.1, y: -4 } }}
    className="card"
  >
    Card content
  </motion.div>
</motion.div>
```

**CSS-only Alternative:**

```css
/* ❌ Bad: Same element triggers and animates */
.card:hover {
  transform: scale(1.1) translateY(-4px);
}

/* ✅ Good: Parent triggers, child animates */
.card-wrapper:hover .card {
  transform: scale(1.1) translateY(-4px);
}

.card {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Tailwind CSS Alternative:**

Use Tailwind's `group` class on the parent and `group-hover:` variants on the target element:

```tsx
{/* ❌ Bad: Hover and animation on the same element causes flicker */}
<div className="hover:-translate-y-1 hover:scale-105 transition-transform">
  Card content
</div>

{/* ✅ Good: Parent handles hover, child handles animation */}
<div className="group">
  <div className="group-hover:-translate-y-1 group-hover:scale-105 transition-transform">
    Card content
  </div>
</div>
```

The parent `group` wrapper creates a stable hover trigger area. The child animates freely with `group-hover:` variants without affecting hover detection. This is particularly useful when the animated element needs significant movement (e.g., `translate-y-6`) that would otherwise cause the cursor to leave the element's bounds.

**Why this matters:**
- Eliminates the frustrating hover flickering bug
- Creates smooth, predictable hover interactions
- The hover area remains stable even during scale/translate animations
- Users can hover confidently without the element "fighting" their cursor

## Scale Animations

- NEVER animate from `scale(0)` - it feels unnatural
- Use initial scale values of 0.9 or higher (0.93 is recommended)
- Higher initial values mimic real-world physics and feel more elegant

## Animating Icons

When icons change contextually (e.g., copy → checkmark, play → pause, like → liked), animate the transition with combined opacity, scale, and blur effects. This makes state changes feel responsive and polished rather than abrupt.

### Icon Libraries

- **[lucide-animated](https://lucide-animated.com)** - 350+ beautifully crafted animated icons. Copy-paste component library (like shadcn/ui) built on Motion. Includes pre-built animations for common patterns: loading spinners, success checkmarks, hover effects, and state transitions. Requires `motion` as a dependency.

**Key principles:**
- Animate icons when they represent state changes or user feedback
- Use small scale values (0.25) combined with blur for smooth perception
- Spring animations with zero bounce feel snappy and intentional
- The blur effect bridges visual gaps during the transition
- Keep animation short (~300ms) to maintain responsiveness

**Implementation with Motion:**

```tsx
import { motion, AnimatePresence } from "motion/react";

<button onClick={handleCopy} className="button">
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.div
      key={isCopied ? "check" : "copy"}
      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </motion.div>
  </AnimatePresence>
</button>
```

**CSS-only Alternative:**

For simpler use cases without Motion, use CSS animations:

```css
@keyframes icon-enter {
  from {
    opacity: 0;
    scale: 0.25;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    scale: 1;
    filter: blur(0px);
  }
}

@keyframes icon-exit {
  from {
    opacity: 1;
    scale: 1;
    filter: blur(0px);
  }
  to {
    opacity: 0;
    scale: 0.25;
    filter: blur(4px);
  }
}

.icon-enter {
  animation: icon-enter 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-exit {
  animation: icon-exit 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Why this matters:**
- Users receive clear, immediate visual feedback when actions complete
- The animation adds polish without slowing down interaction
- Combined scale + blur creates a smooth, professional transition
- Prevents jarring icon swaps that can feel glitchy or unfinished
- Small details like this compound into exceptional user experiences

## Tooltip Behavior

- First tooltip: Include ~500ms delay to prevent accidental activation
- Subsequent tooltips: Remove delay AND animation when user is actively exploring
- Implement using `data-instant` attribute with `transition-duration: 0ms`

## Easing Functions

- For entering/exiting elements: Use `ease-out` (starts fast, feels responsive)
- AVOID built-in CSS easing - they're too weak
- Use custom bezier curves for more energetic motion
- Reference: easings.co for quality easing curves
- Default recommendation: Custom ease-out variations

## Transform Origin

- Make popovers/dropdowns origin-aware
- Set `transform-origin` to match the trigger element position
- Use CSS variables for dynamic origins:
  - Radix: `var(--radix-dropdown-menu-content-transform-origin)`
  - Base UI: `var(--transform-origin)`
- Never leave transform-origin at default `center`

## Animation Duration

- Keep UI animations under 300ms as a rule
- Faster animations improve perceived performance
- Remove animations entirely for frequently-used interactions (10+ times daily)
- Example values:
  - Tooltips: 125ms
  - Dropdowns: 200-300ms
  - Quick transitions: 150-180ms

## Blur for Smooth Transitions

- When animations feel "off" despite correct easing/duration, add `filter: blur(2px)` during transition
- Blur bridges visual gaps between states
- Especially effective for crossfade/state-change animations
- Combine with scale effects for maximum polish

## Code Generation Guidelines

When writing animation code:

1. Default to these values unless specified otherwise
2. Include comments explaining the animation principle being applied
3. Prefer CSS transitions over JavaScript when possible
4. Provide both the animation code and the principle it follows
5. Suggest performance optimizations (transform/opacity over other properties)

## Example Pattern

```css
.button {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.button:active {
  transform: scale(0.97); /* Tactile feedback */
}

.popup {
  transform-origin: var(--transform-origin); /* Origin-aware */
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms
      cubic-bezier(0.4, 0, 0.2, 1);
}

.popup[data-state="open"] {
  transform: scale(1);
  opacity: 1;
}

.popup[data-state="closed"] {
  transform: scale(0.95); /* Not 0 - feels more natural */
  opacity: 0;
}
```

## Mastering AnimatePresence

When an element leaves the DOM, it's gone—there's no way to animate something that no longer exists. Motion's `AnimatePresence` fixes this by keeping departing elements mounted long enough to animate out, then removing them.

The basic usage is straightforward: wrap conditional content, define `initial`, `animate`, and `exit` states, and the component handles the rest. The interesting patterns emerge when basic entry/exit animations aren't enough.

### Reading Presence State with useIsPresent

Sometimes a component needs to know it's exiting—to change its appearance, disable interactions, or trigger side effects. The `useIsPresent` hook provides this information.

```tsx
import { AnimatePresence, motion, useIsPresent } from "motion/react";

function Card() {
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {isPresent ? "Present" : "Exiting..."}
    </motion.div>
  );
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <AnimatePresence>
      {show && <Card />}
    </AnimatePresence>
  );
}
```

**Key principles:**
- The hook returns `true` while mounted normally, `false` during exit animation
- Use this to disable buttons while exiting, switch visual states, or trigger cleanup
- **Important:** `useIsPresent` must be called from a child component of `AnimatePresence`—you cannot inline it where you conditionally render

### Manual Exit Control with usePresence

Standard exit animations run on a fixed timeline. For async cleanup, external animation libraries, or coordinating with systems outside React, use `usePresence` which returns both presence state and a `safeToRemove` callback.

```tsx
import { AnimatePresence, motion, usePresence } from "motion/react";
import { useEffect, useState } from "react";

function Notification() {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // Do async cleanup, then signal removal
      const timer = setTimeout(() => {
        safeToRemove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPresent, safeToRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {isPresent ? "Notification" : "Cleaning up..."}
    </motion.div>
  );
}
```

**Use cases:**
- Save draft content before a modal closes
- Wait for a network request to complete
- Hand control to GSAP or other animation libraries for complex sequences

The exit animation starts immediately while your async work runs in parallel. The element unmounts when both the animation finishes AND `safeToRemove` is called.

### Nested Exits with propagate

When a parent `AnimatePresence` removes children, nested exit animations don't fire by default—the parent wins. Use the `propagate` prop to enable coordinated parent-child exits.

```tsx
import { AnimatePresence, motion } from "motion/react";

const items = ["A", "B", "C"];

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Inner AnimatePresence with propagate */}
          <AnimatePresence propagate>
            {items.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Why this matters:**
- Without `propagate`, children vanish instantly when the parent exits
- With `propagate`, both parent and children run their exit animations
- These details separate polished interfaces from rushed ones

### AnimatePresence Modes

The `mode` prop controls timing between entering and exiting elements:

**`sync` (default):**
- Entering and exiting elements animate simultaneously
- Useful for crossfades or when both should be visible at once
- Handle layout carefully since both elements exist at the same time

```tsx
<AnimatePresence mode="sync">
  <motion.div
    key={show ? "a" : "b"}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
  >
    {show ? "A" : "B"}
  </motion.div>
</AnimatePresence>
```

**`wait`:**
- Exit completes before enter begins
- More elegant sequential transitions
- Note: Total duration is roughly doubled since animations run sequentially

```tsx
<AnimatePresence mode="wait">
  {/* Exit finishes, then enter starts */}
</AnimatePresence>
```

**`popLayout`:**
- Removes exiting elements from document flow immediately
- Exiting elements become absolutely positioned
- Surrounding content reflows instantly
- Ideal for list reordering, morphing layouts, and animated width containers

```tsx
<AnimatePresence mode="popLayout">
  {/* Exiting element is removed from flow immediately */}
</AnimatePresence>
```

### When to Use AnimatePresence vs CSS

CSS now has `@starting-style` for native exit animations, making simple transitions possible without JavaScript. However, AnimatePresence is still necessary for:

- Reading presence state (`useIsPresent`)
- Manual exit control (`usePresence` + `safeToRemove`)
- Directional animations based on navigation
- Coordinated nested exits (`propagate`)
- Complex mode timing (`wait`, `popLayout`)

**Rule of thumb:** Use CSS for simple enter/exit animations on elements that don't need to know they're leaving. Use AnimatePresence when components need presence awareness or coordinated timing.
