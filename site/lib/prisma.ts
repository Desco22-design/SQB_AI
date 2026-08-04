import "./env";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
// Use HTTP fetch for pooled queries - avoids idle WebSocket ECONNRESET in dev
neonConfig.poolQueryViaFetch = true;

// Local development / E2E against a self-hosted Postgres behind Neon's wsproxy,
// so the app can run (and be tested) without a cloud database. Inert unless
// NEON_LOCAL_PROXY is set, which never happens on Vercel.
//
//   docker run -d --name sqb-pg -e POSTGRES_PASSWORD=sqb -e POSTGRES_USER=sqb \
//     -e POSTGRES_DB=sqbai -p 55432:5432 postgres:16-alpine
//   docker run -d --name sqb-wsproxy --link sqb-pg:pg -e APPEND_PORT='pg:5432' \
//     -e ALLOW_ADDR_REGEX='.*' -p 5480:80 ghcr.io/neondatabase/wsproxy:latest
//   DATABASE_URL="postgres://sqb:sqb@pg/sqbai"  NEON_LOCAL_PROXY="localhost:5480"
const localProxy = process.env.NEON_LOCAL_PROXY;
if (localProxy) {
  neonConfig.wsProxy = () => `${localProxy}/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineConnect = false;
  // wsproxy speaks WebSocket only - it has no `/sql` HTTP endpoint, so the
  // fetch transport used against real Neon must be turned off here.
  neonConfig.poolQueryViaFetch = false;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makeClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
