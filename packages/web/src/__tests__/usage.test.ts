/**
 * Tests for usage utility — getClientIP (pure function, no DB needed)
 */

import { describe, it, expect } from "vitest";
import { getClientIP } from "@/lib/usage";

describe("getClientIP", () => {
  it("extracts first IP from x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIP(headers)).toBe("1.2.3.4");
  });

  it("uses x-real-ip as fallback", () => {
    const headers = new Headers({ "x-real-ip": "10.0.0.1" });
    expect(getClientIP(headers)).toBe("10.0.0.1");
  });

  it("prefers x-forwarded-for over x-real-ip", () => {
    const headers = new Headers({
      "x-forwarded-for": "1.1.1.1",
      "x-real-ip": "2.2.2.2",
    });
    expect(getClientIP(headers)).toBe("1.1.1.1");
  });

  it("returns 'unknown' when no IP headers present", () => {
    const headers = new Headers();
    expect(getClientIP(headers)).toBe("unknown");
  });

  it("trims whitespace from forwarded IP", () => {
    const headers = new Headers({ "x-forwarded-for": "  3.3.3.3 , 4.4.4.4" });
    expect(getClientIP(headers)).toBe("3.3.3.3");
  });
});
