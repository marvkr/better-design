import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  return NextResponse.json(
    { error: "oauth_not_supported", error_description: "This server uses Bearer token authentication, not OAuth." },
    { status: 404 },
  );
}
