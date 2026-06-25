// Next.js dev mode uses eval() (webpack eval-source-map + React Fast Refresh) and
// an HMR websocket, so the CSP must allow 'unsafe-eval' and ws: in development.
// Production stays strict (no eval).
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      `connect-src 'self'${isDev ? " ws: wss: http:" : ""}`,
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
