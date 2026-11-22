/**
 * Shared styles for Mallow components.
 *
 * Mallow is light and soft. A surface is a white card with a soft plum
 * shadow, a lilac option track, or a chosen option in a light violet tint
 * inside a violet ring. An action is the solid violet primary or the quiet
 * white secondary, both rounded rectangles. The constants below are the only place those
 * tokens meet class names, so a component picks a depth here rather than
 * writing its own shadow.
 *
 * Form fields (Input, Textarea, PasswordInput, SearchInput, NumberInput,
 * PhoneInput, InputOTP) MUST import `formFieldBase` instead of re-declaring
 * classes. Do NOT copy-paste these strings into a component.
 */

/** The focus ring every interactive part shares: a violet line, no offset. */
export const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** The focus ring for buttons: a card-coloured gap, then the violet line. */
export const controlFocusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

/**
 * The primary finish: solid violet with a faint shade along the bottom edge
 * and a small soft drop. Checkbox, switch, radio and slider use it on
 * their checked parts, so they read as one material with the primary Button.
 */
export const primaryFinish = "bg-(image:--violet-face) text-primary-foreground shadow-(--violet-edge)";

/** The primary finish, a touch brighter, for hover on fine pointers. */
export const primaryFinishHover = "hover:bg-(image:--violet-face-hover)";

/** The quiet white action: secondary buttons and quiet tags. */
export const quietFinish =
  "bg-(image:--quiet-face) text-foreground shadow-(--quiet-edge) hover:bg-(image:--quiet-face-hover)";

/**
 * The chosen option: a light violet tint inside a violet ring. It marks the
 * selected option, the active tab and the pressed toggle.
 */
export const selectedOption = "bg-(--option-face) text-foreground shadow-(--option-edge)";

/** A small white surface with a hairline: avatars, icon tiles and handles that are not a selection. */
export const softPanel = "bg-card text-foreground shadow-(--panel-edge)";

/** The option track: a soft lilac fill that holds a set of options. */
export const optionTrack = "bg-(--option-track) shadow-(--option-track-edge)";

/** The card: a white surface with a hairline and a soft plum shadow. */
export const cardSlab = "bg-card text-card-foreground shadow-(--shadow-card)";

/** A surface nested inside a card: a hairline, with no drop. */
export const surfacePanel = "bg-popover text-card-foreground shadow-(--panel-edge)";

/** The press every button shares: a small scale toward the page. */
export const pressScale =
  "transition-[scale,box-shadow,background-image] duration-fast ease-(--ease-out) active:scale-98 motion-reduce:active:scale-100";

/**
 * The spring that carries a moving selection: critically damped, so it arrives
 * fast and never overshoots. Motion turns it off under reduced motion when
 * the caller reads `useReducedMotion`.
 */
export const panelSpring = { type: "spring", stiffness: 520, damping: 46, mass: 1 } as const;

/** The spring for content that swaps in place, a little softer than a selection. */
export const swapSpring = { type: "spring", stiffness: 420, damping: 38 } as const;

/** The chosen option with a stronger ring on hover, for tags and neutral controls. */
export const selectedLift = `${selectedOption} transition-shadow duration-base ease-(--ease-out) hover:shadow-(--option-edge-hover)`;

/**
 * Base styles shared by every form-field surface: a white field with a
 * 0.625rem corner. A 3:1 edge marks the field, it darkens on hover, and the
 * violet ring marks focus. An invalid field turns that border red.
 */
export const formFieldBase =
  "w-full min-w-0 rounded-lg border border-foreground/55 bg-card px-4 text-base text-foreground shadow-xs " +
  "placeholder:text-muted-foreground " +
  "transition-[box-shadow,border-color] duration-base ease-(--ease-out) " +
  "hover:border-foreground/75 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Height + vertical padding for single-line form fields (3rem, the button height). */
export const formFieldSingleLine = "flex h-12 py-2";

/** Vertical padding and min-height for multi-line form fields. */
export const formFieldMultiLine = "flex min-h-28 py-3 leading-normal";

/**
 * The floating panel shared by every menu, popover, select and tooltip: white,
 * with a hairline and a soft plum drop.
 */
export const popoverSurface = "rounded-xl bg-popover text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel. */
export const menuItemBase =
  "relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * A checked small control (checkbox box, radio, switch track). Radix marks it
 * with data-state="checked"; Base UI with data-checked.
 */
export const controlChecked =
  "data-[state=checked]:bg-(image:--violet-face) data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-(--violet-edge) " +
  "data-[checked]:bg-(image:--violet-face) data-[checked]:text-primary-foreground data-[checked]:shadow-(--violet-edge)";
