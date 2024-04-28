import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import getUserFromToken from './server/methods/user/get-user-from-token';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/sign-up', request.url));
  }

  const user = await getUserFromToken({ accessToken });
  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/dashboard',
};
