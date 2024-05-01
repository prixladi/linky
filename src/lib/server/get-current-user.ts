import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserFromToken } from '@/server/methods/user';

type User = {
  id: number;
  email: string;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const accessToken = headers().get('accessToken') ?? cookies().get('accessToken')?.value;
  if (!accessToken) return null;

  const userResult = await getUserFromToken({ accessToken });
  if ('error' in userResult) return null;
  return userResult;
};

export const getCurrentUserOrRedirect = async (): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) redirect('sign-in');
  return user;
};
