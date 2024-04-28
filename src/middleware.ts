import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Need to import from files directly because barrel export exports bcrypt that is not available in edge runtime
import getUserFromToken from './server/methods/user/get-user-from-token';
import refreshUserToken from './server/methods/user/refresh-user-token';

export const middleware = async (request: NextRequest) => {
  const successResponse = NextResponse.next();

  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) return NextResponse.redirect('/sign-up');

  let user = await getUserFromToken({ accessToken });
  if (!user) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    if (!refreshToken) return NextResponse.redirect('/sign-in');

    const refreshResult = await refreshUserToken({ refreshToken });
    if ('error' in refreshResult) return NextResponse.redirect('/sign-in');

    successResponse.cookies.set('accessToken', refreshResult.accessToken);
    successResponse.headers.set('accessToken', refreshResult.accessToken);
  }

  return successResponse;
};

export const config = {
  matcher: '/dashboard',
};
