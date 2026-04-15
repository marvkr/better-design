import { redirect } from "next/navigation";
import { and, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "@/db";
import { inviteTokens } from "@/db/schema";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ClaimInviteForm } from "./claim-invite-form";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function lookupInvite(token: string) {
  const [row] = await db
    .select({
      email: inviteTokens.email,
      usedAt: inviteTokens.usedAt,
      expiresAt: inviteTokens.expiresAt,
    })
    .from(inviteTokens)
    .where(
      and(
        eq(inviteTokens.token, token),
        isNull(inviteTokens.usedAt),
        or(
          isNull(inviteTokens.expiresAt),
          gt(inviteTokens.expiresAt, new Date()),
        ),
      ),
    )
    .limit(1);
  return row;
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const raw = params.invite;
  const token = Array.isArray(raw) ? raw[0] : raw;

  if (!token) redirect("/");

  const invite = await lookupInvite(token);

  if (!invite) {
    return (
      <div className="flex flex-col max-w-3xl mx-auto w-full">
        <section className="space-y-6 pt-[16vh] 2xl:pt-48">
          <div className="flex flex-col items-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Logo size={40} />
                </div>
                <CardTitle>Invite not valid</CardTitle>
                <CardDescription>
                  This invite link has expired or been used. Join the waitlist
                  and we&apos;ll send you a fresh one.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link href="/">Back to waitlist</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return <ClaimInviteForm email={invite.email} />;
}
