/**
 * Tests for validateDesignSystem, formatValidationResult, validateFoundations
 */

import { describe, it, expect } from "vitest";
import {
  validateDesignSystem,
  formatValidationResult,
  validateFoundations,
} from "@/lib/validate-design-system";

describe("validateDesignSystem", () => {
  const requiredDocFiles = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/sidebar.tsx",
    "app/code-block.tsx",
    "app/custom/icons/page.tsx",
  ];

  it("reports missing doc files when none are present", () => {
    const result = validateDesignSystem({});
    expect(result.hasDocSite).toBe(false);
    expect(result.docSiteMissing).toEqual(requiredDocFiles);
    expect(result.isValid).toBe(false);
  });

  it("hasDocSite is true when all required doc files exist", () => {
    const files: Record<string, string> = {};
    for (const f of requiredDocFiles) {
      files[f] = "content";
    }
    const result = validateDesignSystem(files);
    expect(result.hasDocSite).toBe(true);
    expect(result.docSiteMissing).toEqual([]);
  });

  it("detects primitive component pages from file paths", () => {
    const files: Record<string, string> = {
      ...Object.fromEntries(requiredDocFiles.map((f) => [f, ""])),
      "app/primitives/button/page.tsx": "code",
      "app/primitives/alert-dialog/page.tsx": "code",
    };
    const result = validateDesignSystem(files);
    expect(result.generated).toContain("Button");
    expect(result.generated).toContain("AlertDialog");
  });

  it("detects custom component pages", () => {
    const files: Record<string, string> = {
      ...Object.fromEntries(requiredDocFiles.map((f) => [f, ""])),
      "app/custom/fancy-card/page.tsx": "code",
    };
    const result = validateDesignSystem(files);
    expect(result.custom).toContain("fancy-card");
  });

  it("total counts both primitives and custom", () => {
    const files: Record<string, string> = {
      ...Object.fromEntries(requiredDocFiles.map((f) => [f, ""])),
      "app/primitives/button/page.tsx": "code",
      "app/custom/hero/page.tsx": "code",
    };
    const result = validateDesignSystem(files);
    // icons page from requiredDocFiles is also counted as custom
    expect(result.total).toBe(result.generated.length + result.custom.length);
    expect(result.generated).toContain("Button");
    expect(result.custom).toContain("hero");
  });
});

describe("formatValidationResult", () => {
  it("includes doc site status line", () => {
    const result = validateDesignSystem({});
    const formatted = formatValidationResult(result);
    expect(formatted).toContain("Documentation site structure incomplete");
  });

  it("shows complete message when doc site is valid", () => {
    const files: Record<string, string> = {
      "app/layout.tsx": "",
      "app/page.tsx": "",
      "app/sidebar.tsx": "",
      "app/code-block.tsx": "",
      "app/custom/icons/page.tsx": "",
    };
    const result = validateDesignSystem(files);
    const formatted = formatValidationResult(result);
    expect(formatted).toContain("Documentation site structure complete");
  });
});

describe("validateFoundations", () => {
  it("reports all missing when no foundation pages exist", () => {
    const result = validateFoundations({});
    expect(result.hasFoundations).toBe(false);
    expect(result.missing).toHaveLength(3);
  });

  it("reports complete when all foundation pages exist", () => {
    const files: Record<string, string> = {
      "app/foundations/colors/page.tsx": "",
      "app/foundations/surfaces/page.tsx": "",
      "app/foundations/typography/page.tsx": "",
    };
    const result = validateFoundations(files);
    expect(result.hasFoundations).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it("reports partial missing", () => {
    const files: Record<string, string> = {
      "app/foundations/colors/page.tsx": "",
    };
    const result = validateFoundations(files);
    expect(result.hasFoundations).toBe(false);
    expect(result.missing).toHaveLength(2);
  });
});
