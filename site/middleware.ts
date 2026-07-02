export { default } from "next-auth/middleware";

// Protect everything under /admin/* except the login page itself.
// The negative lookahead is anchored to the exact `login` path segment so a
// future route like /admin/login-history would NOT slip past the auth gate.
export const config = {
  matcher: ["/admin/((?!login(?:/|$)).*)", "/admin"],
};
