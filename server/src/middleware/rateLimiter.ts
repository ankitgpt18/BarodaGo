import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

export function createSlidingWindowRateLimiter(config: RateLimitConfig) {
  // Key: IP or phone identifier -> Array of timestamps (ms)
  const hitsMap = new Map<string, number[]>();

  // Periodically clean up stale records every 5 minutes to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of hitsMap.entries()) {
      const validTimestamps = timestamps.filter((t) => now - t < config.windowMs);
      if (validTimestamps.length === 0) {
        hitsMap.delete(key);
      } else {
        hitsMap.set(key, validTimestamps);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientKey =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'unknown-client';

    const now = Date.now();
    const timestamps = hitsMap.get(clientKey) || [];

    // Filter out timestamps outside the sliding window
    const validTimestamps = timestamps.filter((t) => now - t < config.windowMs);

    if (validTimestamps.length >= config.maxRequests) {
      const oldestHit = validTimestamps[0];
      const retryAfterSeconds = Math.ceil((oldestHit + config.windowMs - now) / 1000);

      res.setHeader('Retry-After', retryAfterSeconds);
      res.setHeader('X-RateLimit-Limit', config.maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', Math.ceil((oldestHit + config.windowMs) / 1000));

      res.status(429).json({
        error: 'Too Many Requests',
        message:
          config.message ||
          'Rate limit exceeded. Please wait before submitting another report.',
        retryAfterSeconds
      });
      return;
    }

    validTimestamps.push(now);
    hitsMap.set(clientKey, validTimestamps);

    res.setHeader('X-RateLimit-Limit', config.maxRequests);
    res.setHeader('X-RateLimit-Remaining', config.maxRequests - validTimestamps.length);
    next();
  };
}
