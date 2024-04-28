import { getUserFromToken } from '@/server/methods/user';
import { cookies } from 'next/headers';

const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) return undefined;
  return await getUserFromToken({ accessToken });
};

export default getCurrentUser;
