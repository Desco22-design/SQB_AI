export { default } from "next-auth/middleware";

// Protect everything under /admin/* except the login page itself
export const config = {
  matcher: ["/admin/((?!login).*)", "/admin"],
};
