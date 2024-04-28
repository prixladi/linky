'use server';

import { cookies } from 'next/headers';

import { refreshUserToken } from '@/server/methods/user';

import { getTokenExpiration } from '..';

type Result = {
  refreshed: boolean;
  nextCheckInS?: number;
};

const refreshUserTokenIfNeededAction = async (): Promise<Result> => {
  const accessToken = cookies().get('accessToken')?.value;
  const accessTokenExpirationS = getTokenExpiration(accessToken);
  if (accessTokenExpirationS && accessTokenExpirationS > 60) {
    return { refreshed: false, nextCheckInS: getNextCheckInS(accessTokenExpirationS) };
  }

  const refreshToken = cookies().get('refreshToken')?.value;
  if (!refreshToken) return { refreshed: false };

  const result = await refreshUserToken({ refreshToken });
  if ('error' in result) return { refreshed: false, nextCheckInS: getNextCheckInS() };

  cookies().set('accessToken', result.accessToken);
  return {
    refreshed: true,
    nextCheckInS: getNextCheckInS(result.accessTokenExpirationS),
  };
};

const getNextCheckInS = (expInS?: number) => {
  if (!expInS || expInS < 0) return 30;
  return expInS - 20;
};

export default refreshUserTokenIfNeededAction;
