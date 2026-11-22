/**
 * Shared form-field styles for instrument.
 *
 * Fields are recessed WELLS: pressed into the panel they sit on, one level
 * below the page ground in the surface ladder. The inset shadow pair plus the
 * bottom hairline highlight makes the well read as carved into the panel,
 * the inverse of the raised gold controls. Focus adds the gold halo on top of
 * the well shadow so depth never flattens while typing.
 */

export const formFieldBase =
  "w-full rounded-lg px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-[var(--gauge-well-border)] " +
  "shadow-[var(--shadow-well)] " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-fast ease-out " +
  "hover:border-border " +
  "focus-visible:outline-none focus-visible:border-[var(--gauge-rim)] " +
  "focus-visible:shadow-[var(--shadow-well),var(--shadow-focus)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const formFieldSingleLine = "flex h-9 py-1.5";
export const formFieldMultiLine = "flex min-h-20 py-2";
