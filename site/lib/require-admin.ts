import "server-only";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

/**
 * Defense-in-depth: enforce an authenticated admin session at the page level,
 * not just via middleware. Call at the top of any admin page that reads or
 * renders sensitive data (PII, submissions, audit). Redirects to the login
 * page when no session is present.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return session;
}
