import { cookies, headers } from 'next/headers';

import { getUserFromToken } from '@/server/methods/user';

const getCurrentUser = async () => {
  const accessToken = headers().get('accessToken') ?? cookies().get('accessToken')?.value;
  if (!accessToken) return undefined;
  return getUserFromToken({ accessToken });
};

export default getCurrentUser;
