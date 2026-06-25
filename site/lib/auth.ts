import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Brute-force protection: cap login attempts per IP and per email.
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Anti-enumeration: a fixed valid bcrypt hash compared against when no user
// is found, so failed lookups take the same time as failed password checks
// and do not leak whether an email exists. Hash of a random unguessable value.
const DUMMY_PASSWORD_HASH =
  "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

// Best-effort IP extraction that tolerates a missing/odd req object.
function deriveIp(req: unknown): string {
  try {
    const maybeReq = req as { headers?: unknown } | undefined;
    if (maybeReq?.headers && typeof (maybeReq.headers as Headers).get === "function") {
      return clientIp(maybeReq as unknown as Request);
    }
    // NextAuth may pass a plain object with a headers record.
    const headers = (maybeReq?.headers ?? {}) as Record<string, string | string[] | undefined>;
    const pick = (name: string): string | undefined => {
      const v = headers[name];
      if (Array.isArray(v)) return v[0];
      return v ?? undefined;
    };
    return (
      pick("x-nf-client-connection-ip") ||
      pick("x-forwarded-for")?.split(",")[0]?.trim() ||
      pick("x-real-ip")?.trim() ||
      "unknown"
    );
  } catch {
    return "unknown";
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase().trim();

        // Brute-force protection: enforce limits on both the source IP and the
        // targeted email before touching the database. Exceeding either returns
        // a generic failure (null) so the response stays uniform.
        const ip = deriveIp(req);
        const ipAllowed = rateLimit(`login:ip:${ip}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
        const emailAllowed = rateLimit(`login:email:${email}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
        if (!ipAllowed || !emailAllowed) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email },
        });

        // Anti-enumeration: when the user is missing, still run a bcrypt
        // comparison against a fixed dummy hash so timing does not reveal
        // whether the email exists, then fail.
        if (!user) {
          await bcrypt.compare(credentials.password, DUMMY_PASSWORD_HASH);
          return null;
        }

        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
