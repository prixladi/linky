import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserFromToken, refreshUserToken } from '@/server/methods/user';

// I would much rather use middleware
// but it does not support switching runtime
// and runs just on the Edge so cba
export const protect = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) return redirect('/sign-up');

  let user = await getUserFromToken({ accessToken });
  if (!user) {
    const refreshToken = cookies().get('refreshToken')?.value;
    if (!refreshToken) return redirect('/sign-in');

    const refreshResult = await refreshUserToken({ refreshToken });
    if ('error' in refreshResult) return redirect('/sign-in');

    user = await getUserFromToken({ accessToken: refreshResult.accessToken });
    if (!user) return redirect('/sign-in');
  }

  return user;
};