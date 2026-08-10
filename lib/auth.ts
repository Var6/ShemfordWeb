/**
 * Signed admin session tokens.
 *
 * Uses Web Crypto (not node:crypto) so the same code runs in route handlers
 * and in proxy.ts, which executes on the Edge runtime.
 */

export const SESSION_COOKIE = "admin_session";

/** Stay signed in for 30 days. */
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

/**
 * Once a session is more than halfway through its life, the proxy issues a
 * fresh cookie. Someone who uses the admin panel regularly is never logged
 * out; someone who stops using it expires after SESSION_TTL_SECONDS.
 */
export const SESSION_RENEW_AFTER_SECONDS = SESSION_TTL_SECONDS / 2;

const encoder = new TextEncoder();

function secret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET;

  if (explicit) return explicit;

  // Fall back to something deploy-specific so a session cannot be forged
  // without knowing the credentials. Changing the password logs everyone out.
  return `${process.env.ADMIN_USERNAME ?? ""}:${process.env.ADMIN_PASSWORD ?? ""}`;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  let binary = "";

  for (let i = 0; i < view.length; i++) binary += String.fromCharCode(view[i]);

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(payload));

  return toBase64Url(signature);
}

/** Constant-time string comparison — avoids leaking the signature byte by byte. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;

  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);

  return diff === 0;
}

export async function createSessionToken(now = Date.now()): Promise<string> {
  const expiresAt = now + SESSION_TTL_SECONDS * 1000;
  const payload = String(expiresAt);

  return `${payload}.${await sign(payload)}`;
}

/** True once the session is past halfway and should be re-issued. */
export function shouldRenew(token: string | undefined | null): boolean {
  if (!token) return false;

  const expiresAt = Number(token.slice(0, token.lastIndexOf(".")));

  if (!Number.isFinite(expiresAt)) return false;

  const remaining = expiresAt - Date.now();

  return remaining > 0 && remaining < SESSION_RENEW_AFTER_SECONDS * 1000;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  // Refuse to validate anything when credentials are unset, otherwise the
  // fallback secret would be a known constant (":").
  if (!process.env.ADMIN_SESSION_SECRET && !process.env.ADMIN_PASSWORD) return false;

  const separator = token.lastIndexOf(".");

  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  return safeEqual(signature, await sign(payload));
}

/** Guard for admin-only route handlers. */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]*)`));

  return verifySessionToken(match ? decodeURIComponent(match[1]) : null);
}
