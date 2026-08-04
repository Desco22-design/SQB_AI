import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import {
  DEFAULT_LOCALE,
  isLocale,
  localeFromAcceptLanguage,
  type Locale,
} from "@/lib/locale";

const LOCALE_COOKIE = "sqbai.locale";

// Public top-level segments that existed before the locale prefix was added.
// A hit on one of these is an old link (or a search result) and gets a
// permanent redirect into the locale-prefixed equivalent, so nothing 404s and
// the accumulated ranking transfers to the new address.
const LEGACY_SEGMENTS = new Set(["news", "events", "team", "careers", "school"]);

// Anything the locale prefix must never be applied to.
function isInfrastructurePath(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/media") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    // A request for a concrete file (it has an extension) is a static asset.
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

function preferredLocale(req: NextRequest): Locale {
  const remembered = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(remembered)) return remembered;
  return localeFromAcceptLanguage(req.headers.get("accept-language"));
}

// The admin area keeps exactly the previous behaviour: next-auth guards
// everything under /admin except the login page itself.
const adminAuth = withAuth({
  callbacks: { authorized: ({ token }) => Boolean(token) },
});

export default function middleware(req: NextRequest, event: unknown) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLogin =
      pathname === "/admin/login" || pathname.startsWith("/admin/login/");
    if (isLogin) return NextResponse.next();
    return (
      adminAuth as unknown as (
        r: NextRequest,
        e: unknown
      ) => ReturnType<typeof NextResponse.next>
    )(req, event);
  }

  if (isInfrastructurePath(pathname)) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Already localised - let it through untouched.
  if (isLocale(first)) return NextResponse.next();

  // `/` -> `/uz` (or the visitor's language). A 307, not a permanent redirect:
  // the target depends on the visitor, so it must not be cached as a fixed map.
  if (segments.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = `/${preferredLocale(req)}`;
    return NextResponse.redirect(url);
  }

  // Old un-prefixed public URL -> permanent redirect into the default locale.
  if (first && LEGACY_SEGMENTS.has(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals outright; the handler above does the finer filtering.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
