/**
 * Simple In-Memory Rate Limiter
 * Prevents chatbot abuse by limiting requests per IP
 * 
 * Rate Limits:
 * - 5 requests per minute per IP
 * - Auto-reset after 60 seconds
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window

/**
 * Get client IP from request
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

/**
 * Check if client has exceeded rate limit
 * Returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore[clientIp];

  // First request from this IP
  if (!clientData) {
    rateLimitStore[clientIp] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return true;
  }

  // Reset if window expired
  if (now > clientData.resetTime) {
    rateLimitStore[clientIp] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return true;
  }

  // Check if under limit
  if (clientData.count < RATE_LIMIT_MAX_REQUESTS) {
    clientData.count++;
    return true;
  }

  // Rate limit exceeded
  return false;
}

/**
 * Get remaining requests for client
 */
export function getRemainingRequests(clientIp: string): number {
  const clientData = rateLimitStore[clientIp];
  if (!clientData) return RATE_LIMIT_MAX_REQUESTS;

  const now = Date.now();
  if (now > clientData.resetTime) return RATE_LIMIT_MAX_REQUESTS;

  return Math.max(0, RATE_LIMIT_MAX_REQUESTS - clientData.count);
}

/**
 * Get reset time in seconds
 */
export function getResetTimeSeconds(clientIp: string): number {
  const clientData = rateLimitStore[clientIp];
  if (!clientData) return 0;

  const now = Date.now();
  if (now > clientData.resetTime) return 0;

  return Math.ceil((clientData.resetTime - now) / 1000);
}

/**
 * Clean up old entries (run periodically)
 * Prevents memory leak
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const ip in rateLimitStore) {
    if (now > rateLimitStore[ip].resetTime) {
      delete rateLimitStore[ip];
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
