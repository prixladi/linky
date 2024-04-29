import { cookies, headers } from 'next/headers';

import { getUserFromToken } from '@/server/methods/user';

const getCurrentUser = async () => {
  const accessToken = headers().get('accessToken') ?? cookies().get('accessToken')?.value;
  if (!accessToken) return undefined;

  const userResult = await getUserFromToken({ accessToken });
  if ('error' in userResult) return undefined;
  return userResult;
};

export default getCurrentUser;
