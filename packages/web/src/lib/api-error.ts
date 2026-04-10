export class ApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  // Compat with current error.data?.code pattern
  get data() {
    return { code: this.code };
  }
}

/**
 * Awaits a Hono RPC response, throws ApiError on non-OK responses,
 * and returns the typed JSON payload.
 */
export async function fetchJson<T>(res: { ok: boolean; json(): Promise<T> }): Promise<T> {
  if (!res.ok) {
    const body = (await (res as Response).json().catch(() => ({}))) as {
      code?: string;
      message?: string;
    };
    throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
  }
  return res.json();
}
