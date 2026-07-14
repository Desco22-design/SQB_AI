// Bounded in-memory sliding-window rate limiter - no external dependencies.
//
// NOTE: This is process-local. On serverless/multi-instance deployments
// (Vercel, Netlify Functions) each instance has its own Map, so the effective
// limit is multiplied by the instance count. For true multi-instance
// correctness this should be backed by Redis or Vercel KV. It still provides
// meaningful per-instance abuse resistance.

const MAX_KEYS = 10_000;

type Timestamps = number[];

const buckets = new Map<string, Timestamps>();

/**
 * Sliding-window rate limit check.
 * Returns `true` when the request is allowed, `false` when the limit is hit.
 *
 * @param key      Identifier for the caller (e.g. IP address + route).
 * @param max      Max allowed requests within the window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  const existing = buckets.get(key) ?? [];
  const recent = existing.filter((ts) => now - ts < windowMs);

  if (recent.length >= max) {
    // Keep the pruned list so memory does not grow with rejected bursts.
    buckets.set(key, recent);
    return false;
  }

  recent.push(now);
  buckets.set(key, recent);

  // Cap the Map size to prevent unbounded memory growth under key churn
  // (e.g. spoofed IPs). Evict the oldest inserted keys on overflow.
  if (buckets.size > MAX_KEYS) {
    const overflow = buckets.size - MAX_KEYS;
    const iterator = buckets.keys();
    for (let i = 0; i < overflow; i++) {
      const oldestKey = iterator.next().value;
      if (oldestKey === undefined) break;
      buckets.delete(oldestKey);
    }
  }

  return true;
}

/**
 * Derive the client IP from common proxy/CDN headers.
 * Falls back to "unknown" when no header is present.
 */
export function clientIp(req: Request): string {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
