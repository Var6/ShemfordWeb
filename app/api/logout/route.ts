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

export async function GET(request: NextRequest) {
  return clearSession(NextResponse.redirect(new URL('/admin', request.url)));
}

export async function POST() {
  return clearSession(
    NextResponse.json({ success: true, message: 'Logged out successfully' }),
  );
}
