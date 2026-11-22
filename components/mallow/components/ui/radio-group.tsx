"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing, panelSpring, selectedOption, optionTrack } from "./_shared";

/** What an option needs from its group to draw the sliding panel. */
interface RadioGroupState {
  value: string | undefined;
  panelId: string;
  reduceMotion: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupState | null>(null);

/**
 * Mallow RadioGroup.
 *
 * `default` lays plain radios out in a column. `well` is the system's
 * signature: the options sit inside one lilac option track, and the chosen
 * option takes a violet tint inside a violet ring, which slides to the next choice on a critically
 * damped spring and never overshoots. Use `RadioGroupOption` inside a `well`
 * group. The group tracks its own value, so it works controlled or not.
 */
interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  variant?: "default" | "well";
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, variant = "default", value, defaultValue, onValueChange, ...props }, ref) => {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const current = value ?? uncontrolled;
  const panelId = React.useId();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <RadioGroupContext.Provider value={{ value: current, panelId, reduceMotion }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        data-slot="radio-group"
        data-variant={variant}
        value={current}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolled(next);
          onValueChange?.(next);
        }}
        className={cn(
          variant === "well"
            ? cn(optionTrack, "isolate grid auto-cols-fr gap-1 rounded-2xl p-1 sm:grid-flow-col")
            : "grid gap-3",
          className,
        )}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * The round mark itself: a thin ink outline when empty, the primary
 * Button's violet finish with a pale lilac centre dot when chosen.
 */
const radioMark =
  "relative grid size-5 shrink-0 place-items-center rounded-full border-2 border-foreground/50 " +
  "transition-[background-color,border-color,box-shadow] duration-fast ease-(--ease-out)";

const radioMarkChecked =
  "border-transparent bg-(image:--violet-face) shadow-(--violet-edge)";

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(
      radioMark,
      "aspect-square hover:border-foreground/70",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-(image:--violet-face) data-[state=checked]:shadow-(--violet-edge)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="grid place-items-center">
      <span className="size-1.75 rounded-full bg-primary-foreground" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

/**
 * One option inside a `well` group: a label row with an optional icon and
 * the round mark at the end, then any content below it. The violet tint and
 * ring slide under the chosen option's text.
 */
interface RadioGroupOptionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const RadioGroupOption = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupOptionProps
>(({ className, label, icon, children, value, ...props }, ref) => {
  const group = React.useContext(RadioGroupContext);
  const checked = group?.value === value;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      data-slot="radio-group-option"
      className={cn(
        "group/option relative block rounded-xl px-4.5 pt-4 pb-4.5 text-left text-foreground",
        focusRing,
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {checked && (
        <motion.span
          layoutId={`${group?.panelId}-panel`}
          aria-hidden="true"
          data-slot="radio-group-panel"
          className={cn(selectedOption, "absolute inset-0 z-0 rounded-xl")}
          transition={group?.reduceMotion ? { duration: 0 } : panelSpring}
        />
      )}
      <span className="relative z-10 grid">
        <span className="flex items-center gap-2.5 text-base font-medium leading-6 [&_svg]:size-5 [&_svg]:shrink-0">
          {icon}
          {label}
          <span
            aria-hidden="true"
            className={cn(
              radioMark,
              "ms-auto",
              checked ? radioMarkChecked : "group-hover/option:border-foreground/70",
            )}
          >
            {checked && <span className="size-1.75 rounded-full bg-primary-foreground" />}
          </span>
        </span>
        {children}
      </span>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupOption.displayName = "RadioGroupOption";

export { RadioGroup, RadioGroupItem, RadioGroupOption };
export type { RadioGroupProps, RadioGroupOptionProps };
