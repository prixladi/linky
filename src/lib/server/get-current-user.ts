import { getUserFromToken } from '@/server/methods/user';
import { cookies, headers } from 'next/headers';

const getCurrentUser = async () => {
  const accessToken = headers().get('accessToken') ?? cookies().get('accessToken')?.value;
  if (!accessToken) return undefined;
  return await getUserFromToken({ accessToken });
};

export default getCurrentUser;
