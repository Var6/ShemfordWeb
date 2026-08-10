import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  shouldRenew,
  verifySessionToken,
} from '@/lib/auth';

/** API namespaces whose writes are admin-only. Reads stay public. */
const PROTECTED_API = [
  '/api/achievements',
  '/api/announcements',
  '/api/calendar',
  '/api/content',
  '/api/events',
  '/api/facilities',
  '/api/faculties',
  '/api/toppers',
  '/api/upload',
];

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isLoggedIn = await verifySessionToken(token);

  if (pathname.startsWith('/api/')) {
    const needsAuth =
      WRITE_METHODS.has(request.method) &&
      PROTECTED_API.some((prefix) => pathname.startsWith(prefix));

    if (needsAuth && !isLoggedIn) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/Shemford') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (pathname === '/admin' && isLoggedIn) {
    return NextResponse.redirect(new URL('/Shemford', request.url));
  }

  return withRenewedSession(NextResponse.next(), token, isLoggedIn);
}

/** Slide the session forward so active admins are never logged out. */
async function withRenewedSession(
  response: NextResponse,
  token: string | undefined,
  isLoggedIn: boolean,
) {
  if (!isLoggedIn || !shouldRenew(token)) return response;

  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/Shemford/:path*', '/admin', '/api/:path*'],
};
