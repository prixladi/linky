import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
};

export const config = {
  matcher: '/dashboard',
};
