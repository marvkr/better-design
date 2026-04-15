// Mint an invite token for an email address, bound so only that email
// can complete signup at /sign-up?invite=<token>.
//
// Usage:
//   bun run src/scripts/mint-invite.ts --email you@example.com
//   bun run src/scripts/mint-invite.ts --email you@example.com --note "Friend"
//   bun run src/scripts/mint-invite.ts --email you@example.com --days 14
//
// Prints the personalized URL on success.

import { randomBytes } from "crypto";
import { db, inviteTokens } from "@/db";

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function generateToken(): string {
  return randomBytes(24).toString("base64url");
}

async function main() {
  const email = arg("email")?.toLowerCase().trim();
  const note = arg("note");
  const daysRaw = arg("days");

  if (!email || !email.includes("@")) {
    console.error(
      "Usage: mint-invite --email <email> [--note <note>] [--days <n>]",
    );
    process.exit(1);
  }

  const expiresAt = daysRaw
    ? new Date(Date.now() + Number(daysRaw) * 24 * 60 * 60 * 1000)
    : undefined;

  const token = generateToken();

  await db.insert(inviteTokens).values({
    token,
    email,
    note: note ?? null,
    expiresAt: expiresAt ?? null,
  });

  const base = process.env.INVITE_BASE_URL ?? "https://better-design.com";
  const url = `${base}/sign-up?invite=${token}`;

  console.log("\n✅ Invite minted");
  console.log(`   email: ${email}`);
  if (note) console.log(`   note:  ${note}`);
  if (expiresAt) console.log(`   expires: ${expiresAt.toISOString()}`);
  console.log(`\n   ${url}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
