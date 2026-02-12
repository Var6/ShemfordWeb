import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Security: Credentials stored in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Rate limiting: Simple in-memory store (use Redis in production)
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

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

    const { username, password } = await request.json();

    // Validate credentials from environment variables
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Admin credentials not configured in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Use timing-safe comparison to prevent timing attacks
    const encoder = new TextEncoder();
    const usernameMatch = crypto.timingSafeEqual(
      encoder.encode(username || ''),
      encoder.encode(ADMIN_USERNAME)
    );
    const passwordMatch = crypto.timingSafeEqual(
      encoder.encode(password || ''),
      encoder.encode(ADMIN_PASSWORD)
    );

    if (usernameMatch && passwordMatch) {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
      });

      response.cookies.set('admin_logged_in', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 24 hours
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