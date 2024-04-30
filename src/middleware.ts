import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Need to import from files directly because barrel export exports bcrypt that is not available in edge runtime
import { getTokenCookieOptions } from './lib/get-token-cookie-options';
import { getUserFromToken } from './server/methods/user/get-user-from-token';
import { refreshUserToken } from './server/methods/user/refresh-user-token';

export const middleware = async (request: NextRequest) => {
  const successResponse = NextResponse.next();

  const accessToken = request.cookies.get('accessToken')?.value;

  let validUser = Boolean(accessToken);
  if (accessToken) {
    const userResult = await getUserFromToken({ accessToken });
    validUser = !('error' in userResult);
  }

  if (!validUser) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    if (!refreshToken) return NextResponse.redirect(new URL('/sign-in', request.url));

    const refreshResult = await refreshUserToken({ refreshToken });
    if ('error' in refreshResult) return NextResponse.redirect(new URL('/sign-in', request.url));

    successResponse.cookies.set('accessToken', refreshResult.accessToken, getTokenCookieOptions());
    successResponse.headers.set('accessToken', refreshResult.accessToken);
  }

  return successResponse;
};

export const config = {
  matcher: '/dashboard',
};
