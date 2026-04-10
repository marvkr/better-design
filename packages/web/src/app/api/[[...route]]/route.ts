import { handle } from "hono/vercel";
import { api } from "@/server/api/routes";

export const runtime = "nodejs";

export const GET = handle(api);
export const POST = handle(api);
export const PATCH = handle(api);
export const PUT = handle(api);
export const DELETE = handle(api);
