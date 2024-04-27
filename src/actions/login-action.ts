'use server';

import { login } from '@/server/methods/user';
import { cookies } from 'next/headers';

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
};

export default loginAction;
