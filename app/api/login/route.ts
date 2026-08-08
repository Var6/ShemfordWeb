import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { SESSION_COOKIE, SESSION_TTL_SECONDS, createSessionToken } from '@/lib/auth';

// Security: Credentials stored in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Rate limiting: Simple in-memory store (use Redis in production)
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

// timingSafeEqual throws a RangeError when the buffers differ in length, so
// compare fixed-width digests instead of the raw credentials.
function sha256(value: string): Uint8Array {
  return new Uint8Array(crypto.createHash('sha256').update(value, 'utf8').digest());
}

function safeEqual(a: string, b: string): boolean {
  return crypto.timingSafeEqual(sha256(a), sha256(b));
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);

  if (!attempt) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  // Reset after 15 minutes
  if (now - attempt.timestamp > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  // Allow 5 attempts per 15 minutes
  if (attempt.count >= 5) {
    return true;
  }

  attempt.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate credentials from environment variables
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error(
        'Admin credentials not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local'
      );
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { username, password } = (body ?? {}) as {
      username?: unknown;
      password?: unknown;
    };

    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Use timing-safe comparison to prevent timing attacks
    const usernameMatch = safeEqual(username, ADMIN_USERNAME);
    const passwordMatch = safeEqual(password, ADMIN_PASSWORD);

    if (usernameMatch && passwordMatch) {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
      });

      // Signed, HttpOnly session — cannot be forged from the browser.
      response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_TTL_SECONDS,
        path: '/',
      });

      // Reset rate limiting on successful login
      loginAttempts.delete(ip);

      return response;
    } else {
      // Don't reveal which field is wrong for security
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint. Use POST method.' },
    { status: 405 }
  );
}