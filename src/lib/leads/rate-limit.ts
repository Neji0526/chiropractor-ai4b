/**
 * In-memory submission throttle.
 *
 * This is a frontend-only build with no database, so the counter lives in the
 * server process and resets on restart. It stops a single visitor hammering the
 * form; it is not a substitute for a shared store (Redis, Postgres) or a real
 * CAPTCHA once a backend exists.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Bucket = { count: number; expiresAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, now: number): { allowed: boolean } {
  // Opportunistic cleanup so the map can't grow without bound.
  if (buckets.size > 500) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.expiresAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);

  if (!existing || existing.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (existing.count >= MAX_PER_WINDOW) return { allowed: false };

  existing.count += 1;
  return { allowed: true };
}
