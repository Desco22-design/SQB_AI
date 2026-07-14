// Next.js dev mode uses eval() (webpack eval-source-map + React Fast Refresh) and
// an HMR websocket, so the CSP must allow 'unsafe-eval' and ws: in development.
// Production stays strict (no eval).
// Default to the STRICT CSP; only relax when the env explicitly says "development".
// (Fail-closed: any unexpected/empty NODE_ENV gets the locked-down policy.)
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      // Allow the resume upload to reach the Google Apps Script Web App.
      // /exec 302-redirects to script.googleusercontent.com, so both hosts are needed.
      `connect-src 'self' https://script.google.com https://script.googleusercontent.com${isDev ? " ws: wss: http:" : ""}`,
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join("; ")
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  },
  images: {
    // The dev image optimizer processes requests serially and silently drops
    // them once a page asks for many at once (the homepage requests ~76). The
    // dropped ones never retry, so images render blank until a reload. Serving
    // them unoptimized locally removes that bottleneck entirely; production
    // still goes through Vercel's optimizer + CDN.
    unoptimized: isDev,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" }
    ]
  },
  // Prisma + Neon serverless driver must be loaded at runtime, not bundled by webpack
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/client",
      ".prisma/client",
      "@prisma/adapter-neon",
      "@neondatabase/serverless",
      "ws"
    ]
  }
};
export default nextConfig;
