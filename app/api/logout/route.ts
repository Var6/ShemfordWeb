import { NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE } from '@/lib/auth';

function clearSession(response: NextResponse) {
  for (const name of [SESSION_COOKIE, 'admin_logged_in']) {
    response.cookies.set(name, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });
  }

  return response;
}

/**
 * A browser or router may speculatively fetch a link before the user clicks
 * it. Logging out on a prefetch would sign the admin out for merely rendering
 * a page that links here, so those requests are answered without touching the
 * session.
 */
function isPrefetch(request: NextRequest) {
  const headers = request.headers;

  return (
    headers.get('next-router-prefetch') === '1' ||
    headers.get('purpose') === 'prefetch' ||
    headers.get('x-purpose') === 'prefetch' ||
    headers.get('x-moz') === 'prefetch' ||
    (headers.get('sec-purpose') ?? '').includes('prefetch')
  );
}

export async function GET(request: NextRequest) {
  if (isPrefetch(request)) {
    return new NextResponse(null, { status: 204 });
  }

  return clearSession(NextResponse.redirect(new URL('/admin', request.url)));
}

export async function POST() {
  return clearSession(
    NextResponse.json({ success: true, message: 'Logged out successfully' }),
  );
}
