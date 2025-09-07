import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/Shemford')) {
    const isLoggedIn = request.cookies.get('admin_logged_in');
    
    if (!isLoggedIn || isLoggedIn.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  if (pathname === '/admin') {
    const isLoggedIn = request.cookies.get('admin_logged_in');
    
    if (isLoggedIn && isLoggedIn.value === 'true') {
      return NextResponse.redirect(new URL('/Shemford', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/Shemford/:path*', '/admin'],
};