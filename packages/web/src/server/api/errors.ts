import type { Context } from "hono";

export class AppError extends Error {
  code: string;
  statusCode: number;

  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

export function unauthorized(message = "Not authenticated") {
  return new AppError("UNAUTHORIZED", message, 401);
}

export function forbidden(message = "Forbidden") {
  return new AppError("FORBIDDEN", message, 403);
}

export function notFound(message = "Not found") {
  return new AppError("NOT_FOUND", message, 404);
}

export function badRequest(message = "Bad request") {
  return new AppError("BAD_REQUEST", message, 400);
}

export function tooManyRequests(message = "Too many requests") {
  return new AppError("TOO_MANY_REQUESTS", message, 429);
}

export function internalError(message = "Internal server error") {
  return new AppError("INTERNAL_ERROR", message, 500);
}

export function handleError(c: Context, error: unknown) {
  if (error instanceof AppError) {
    return c.json({ code: error.code, message: error.message }, error.statusCode as 400 | 401 | 403 | 404 | 429 | 500);
  }
  console.error("Unhandled error:", error);
  return c.json({ code: "INTERNAL_ERROR", message: "Internal server error" }, 500);
}
