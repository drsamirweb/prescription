import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ['/auth/signin', '/auth/signup'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Allow Next.js internal requests and auth API calls
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/auth') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // If the user has a token and is on a public path (signin/signup), redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If the user does not have a token and is not on a public path, redirect to signin
  if (!token && !isPublicPath) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};