/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" }
    ]
  },
  // Prisma needs to be loaded at runtime, not bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", ".prisma/client", "@netlify/blobs"]
  }
};
export default nextConfig;
