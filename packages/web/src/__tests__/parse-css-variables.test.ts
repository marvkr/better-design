/**
 * Tests for parseCSSVariables utility
 */

import { describe, it, expect } from "vitest";
import { parseCSSVariables } from "@/lib/parse-css-variables";

describe("parseCSSVariables", () => {
  it("returns empty object for empty input", () => {
    expect(parseCSSVariables("")).toEqual({});
  });

  it("returns empty object for undefined-ish input", () => {
    expect(parseCSSVariables("")).toEqual({});
  });

  it("extracts :root variables", () => {
    const css = `:root {
      --primary: #635BFF;
      --background: #000;
      --border-radius: 4px;
    }`;
    const result = parseCSSVariables(css);
    expect(result).toEqual({
      "--primary": "#635BFF",
      "--background": "#000",
      "--border-radius": "4px",
    });
  });

  it("returns only :root vars when isDark=false", () => {
    const css = `:root {
      --primary: white;
    }
    .dark {
      --primary: black;
    }`;
    const result = parseCSSVariables(css, false);
    expect(result).toEqual({ "--primary": "white" });
  });

  it("merges .dark vars on top of :root when isDark=true", () => {
    const css = `:root {
      --primary: white;
      --bg: #fff;
    }
    .dark {
      --primary: black;
    }`;
    const result = parseCSSVariables(css, true);
    expect(result["--primary"]).toBe("black");
    expect(result["--bg"]).toBe("#fff");
  });

  it("handles CSS with no :root block", () => {
    const css = `.dark { --color: red; }`;
    const result = parseCSSVariables(css, true);
    expect(result["--color"]).toBe("red");
  });

  it("handles OKLCH values", () => {
    const css = `:root {
      --primary: oklch(0.637 0.237 311.31);
    }`;
    const result = parseCSSVariables(css);
    expect(result["--primary"]).toBe("oklch(0.637 0.237 311.31)");
  });
});
