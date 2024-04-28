'use server';

import { cookies } from 'next/headers';

const logoutUserAction = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export default logoutUserAction;
