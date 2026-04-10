/**
 * Tests for server error classes and handleError
 */

import { describe, it, expect } from "vitest";
import { Hono } from "hono";
import {
  AppError,
  unauthorized,
  forbidden,
  notFound,
  badRequest,
  tooManyRequests,
  internalError,
  handleError,
} from "@/server/api/errors";

describe("AppError", () => {
  it("stores code, message, and statusCode", () => {
    const err = new AppError("CUSTOM", "Custom error", 418);
    expect(err.code).toBe("CUSTOM");
    expect(err.message).toBe("Custom error");
    expect(err.statusCode).toBe(418);
    expect(err).toBeInstanceOf(Error);
  });
});

describe("error factory functions", () => {
  it("unauthorized() creates 401", () => {
    const err = unauthorized();
    expect(err.statusCode).toBe(401);
    expect(err.code).toBe("UNAUTHORIZED");
  });

  it("unauthorized() accepts custom message", () => {
    const err = unauthorized("Token expired");
    expect(err.message).toBe("Token expired");
  });

  it("forbidden() creates 403", () => {
    const err = forbidden();
    expect(err.statusCode).toBe(403);
    expect(err.code).toBe("FORBIDDEN");
  });

  it("notFound() creates 404", () => {
    const err = notFound();
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe("NOT_FOUND");
  });

  it("badRequest() creates 400", () => {
    const err = badRequest();
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe("BAD_REQUEST");
  });

  it("tooManyRequests() creates 429", () => {
    const err = tooManyRequests();
    expect(err.statusCode).toBe(429);
    expect(err.code).toBe("TOO_MANY_REQUESTS");
  });

  it("internalError() creates 500", () => {
    const err = internalError();
    expect(err.statusCode).toBe(500);
    expect(err.code).toBe("INTERNAL_ERROR");
  });
});

describe("handleError", () => {
  it("returns correct JSON for AppError", async () => {
    const app = new Hono()
      .get("/", () => {
        throw notFound("Page missing");
      })
      .onError((err, c) => handleError(c, err));

    const res = await app.request(new Request("http://localhost/"));
    expect(res.status).toBe(404);
    const body = await res.json() as { code: string; message: string };
    expect(body.code).toBe("NOT_FOUND");
    expect(body.message).toBe("Page missing");
  });

  it("returns 500 for non-AppError", async () => {
    const app = new Hono()
      .get("/", () => {
        throw new Error("unexpected");
      })
      .onError((err, c) => handleError(c, err));

    const res = await app.request(new Request("http://localhost/"));
    expect(res.status).toBe(500);
    const body = await res.json() as { code: string };
    expect(body.code).toBe("INTERNAL_ERROR");
  });
});
