'use server';

import { cookies } from 'next/headers';

import { getTokenCookieOptions } from '@/lib';
import { loginUser } from '@/server/methods/user';

type LoginData = {
  email: string;
  password: string;
};

const loginAction = async (data: LoginData) => {
  const result = await loginUser(data);
  if ('error' in result) return result;

  const { accessToken, refreshToken } = result;

  cookies().set('accessToken', accessToken, getTokenCookieOptions());
  cookies().set('refreshToken', refreshToken, getTokenCookieOptions());

  return undefined;
};

export default loginAction;
