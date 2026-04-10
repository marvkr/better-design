/**
 * Tests for ApiError class and fetchJson utility
 */

import { describe, it, expect } from "vitest";
import { ApiError, fetchJson } from "@/lib/api-error";

describe("ApiError", () => {
  it("stores code and message", () => {
    const err = new ApiError("NOT_FOUND", "Resource not found");
    expect(err.code).toBe("NOT_FOUND");
    expect(err.message).toBe("Resource not found");
  });

  it("extends Error", () => {
    const err = new ApiError("BAD_REQUEST", "Invalid input");
    expect(err).toBeInstanceOf(Error);
  });

  it("exposes data.code for compat", () => {
    const err = new ApiError("UNAUTHORIZED", "No token");
    expect(err.data).toEqual({ code: "UNAUTHORIZED" });
  });
});

describe("fetchJson", () => {
  it("returns parsed JSON on ok response", async () => {
    const mockRes = {
      ok: true,
      json: async () => ({ id: 1, name: "test" }),
    };
    const result = await fetchJson(mockRes);
    expect(result).toEqual({ id: 1, name: "test" });
  });

  it("throws ApiError on non-ok response with error body", async () => {
    const mockRes = {
      ok: false,
      json: async () => ({ code: "NOT_FOUND", message: "Not found" }),
    } as { ok: boolean; json(): Promise<unknown> };

    await expect(fetchJson(mockRes)).rejects.toThrow(ApiError);
    try {
      await fetchJson(mockRes);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      expect((e as ApiError).code).toBe("NOT_FOUND");
      expect((e as ApiError).message).toBe("Not found");
    }
  });

  it("throws ApiError with defaults when error body has no code/message", async () => {
    const mockRes = {
      ok: false,
      json: async () => ({}),
    } as { ok: boolean; json(): Promise<unknown> };

    await expect(fetchJson(mockRes)).rejects.toThrow(ApiError);
    try {
      await fetchJson(mockRes);
    } catch (e) {
      expect((e as ApiError).code).toBe("UNKNOWN");
      expect((e as ApiError).message).toBe("Something went wrong");
    }
  });

  it("throws ApiError with defaults when json() fails", async () => {
    const mockRes = {
      ok: false,
      json: async () => { throw new Error("parse error"); },
    } as { ok: boolean; json(): Promise<unknown> };

    await expect(fetchJson(mockRes)).rejects.toThrow(ApiError);
  });
});
