/** Standalone guards required by Better Design interaction components. */
export function isString<TValue>(value: TValue | string): value is string {
  return typeof value === "string";
}

export function isNumber<TValue>(value: TValue | number): value is number {
  return typeof value === "number";
}

export function isBoolean<TValue>(value: TValue | boolean): value is boolean {
  return typeof value === "boolean";
}

export function isObjectLike<TValue>(value: TValue): value is TValue & object {
  return typeof value === "object" && value !== null;
}

export function isRecordLike<TValue>(value: TValue): value is TValue & object {
  return isObjectLike(value) && !Array.isArray(value);
}

export function hasGlobal(name: string): boolean {
  return name in globalThis;
}

export function isBrowser(): boolean {
  return hasGlobal("window");
}

export function hasDocument(): boolean {
  return hasGlobal("document");
}

export function hasNavigator(): boolean {
  return hasGlobal("navigator");
}

export function hasProcess(): boolean {
  return hasGlobal("process");
}

export function lookup<TValue>(table: Record<string, TValue>, key: string): TValue | undefined {
  return table[key];
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };
