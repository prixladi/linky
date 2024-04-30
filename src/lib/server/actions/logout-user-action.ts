'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logoutUserAction = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/');
};

export default logoutUserAction;
