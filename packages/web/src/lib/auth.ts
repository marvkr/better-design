import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { consumeInviteForEmail } from "@/server/api/routes/invites";

function getBaseURL() {
  // Explicit env var takes priority
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }
  // Vercel production/preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return "http://localhost:3000";
}

function createAuth() {
  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: getBaseURL(),
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
    },
    user: {
      additionalFields: {
        plan: {
          type: "string",
          required: false,
          defaultValue: "free",
          input: false,
        },
        isAdmin: {
          type: "boolean",
          required: false,
          defaultValue: false,
          input: false,
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const ok = await consumeInviteForEmail(user.email);
            if (!ok) {
              throw new APIError("FORBIDDEN", {
                message:
                  "Better Design is invite-only. Request access on the waitlist.",
              });
            }
            return { data: user };
          },
          after: async (user) => {
            const { alertNewSignup } = await import("@/lib/alerts");
            alertNewSignup(user.email, user.name).catch(() => {});
            try {
              const { getPostHog } = await import("@/lib/posthog");
              getPostHog().identify({
                distinctId: user.id,
                properties: {
                  $set: {
                    email: user.email,
                    name: user.name,
                  },
                  $set_once: {
                    created_at: new Date().toISOString(),
                  },
                },
              });
              getPostHog().capture({
                distinctId: user.id,
                event: "user_signed_up",
                properties: {
                  email: user.email,
                  name: user.name,
                },
              });
            } catch {}
          },
        },
      },
    },
  });
}

let _auth: ReturnType<typeof createAuth> | undefined;
function getAuth() {
  if (!_auth) _auth = createAuth();
  return _auth;
}

export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_, prop) {
    return Reflect.get(getAuth(), prop);
  },
  has(_, prop) {
    return prop in getAuth();
  },
});

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];
