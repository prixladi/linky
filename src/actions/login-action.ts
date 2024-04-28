'use server';

import { cookies } from 'next/headers';

import { login } from '@/server/methods/user';

type LoginData = {
  email: string;
  password: string;
};

const loginAction = async (data: LoginData) => {
  const result = await login(data);
  if ('error' in result) return result;

  const { accessToken, refreshToken } = result;

  cookies().set('accessToken', accessToken);
  cookies().set('refreshToken', refreshToken);

  return undefined;
};

export default loginAction;
